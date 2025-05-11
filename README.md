# WAX Auto Vote Caster

A minimalist script to cast custodian votes on the WAX blockchain using your private key.
Designed for Bun.
## Setup

1. Install dependencies:
```
bun install
```
2. Create a .env file:
```
    PRIVATE_KEY=your_private_key_here
    VOTER=youraccount
    PRODUCERS=producer1,producer2
```
## Run the script
```
bun main.js
```
##  Output Example

On success:
```
✅ TX ID: abc123...xyz
```
On failure:
```
Error: <error details>
```

