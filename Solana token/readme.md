## Solana Token :
The Spartan Token can be [viewed here](https://explorer.solana.com/address/AaEeWdxbHgegg9XJHQbWzJFj1QmpxJ94rpKXtosQ85Zs?cluster=devnet) <br />
<img width="1134" alt="Screenshot 2023-04-05 at 10 16 15 PM" src="https://user-images.githubusercontent.com/83267766/230148608-d90e2fa3-e45b-4866-a8df-58eb5b0f0a15.png">

This folder will create a wallet and airdrop some SOL, create fungible token metadata and mint a new fungible SPL token on Solana.<br />
In order to mint a fungible SPL token, we first want to create a Devnet Wallet and airdrop SOL into it.<br />
The wallet.ts file does this part :<br />
1. Connect to Solana Network<br />
2. Generate a new Solana Wallet<br />
3. Write Wallet Secret/Private Key to a .JSON<br />
4. Airdrop 1 SOL to new wallet for Gas fees<br />

The mint.ts file mints the token and had the metadata stored for our token<br />
It does the following part:<br />
1. Upload MetaData<br />
2. Create Mint Transaction<br />
3. Execute Mint Transaction<br />
