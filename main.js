const { Api, JsonRpc } = require("eosjs");
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig");
const { TextDecoder, TextEncoder } = require("util");

// Bun auto-loads .env
const privateKey = process.env.PRIVATE_KEY;
const voter = process.env.VOTER;
const producers = process.env.PRODUCERS?.split(",").map(p => p.trim());
const planet_id = "eyekeunn";

if (!privateKey || !voter || !producers?.length) {
  console.error("❌ Missing environment variables. Please check your .env file.");
  process.exit(1);
}

// EOSJS setup
const rpc = new JsonRpc("https://wax.greymass.com");
const signatureProvider = new JsSignatureProvider([privateKey]);
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
});

// Vote execution
async function voteCust() {
  try {
    const result = await api.transact(
      {
        actions: [
          {
            account: "dao.worlds",
            name: "votecust",
            authorization: [{ actor: voter, permission: "active" }],
            data: {
              dac_id: planet_id,
              voter,
              newvotes: producers,
            },
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    );

    console.log("✅ TX ID:", result.transaction_id);
  } catch (err) {
    console.error("❌ Error:", err.message || err);
  }
}

voteCust();
