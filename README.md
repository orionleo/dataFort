# DataFort

A way to survey land using drones and store data in a decentralised way


## Information : 
- The deployed website for decentralised image sharing can be [found here](https://data-fort.vercel.app/). The repository for the website can be [found here](https://github.com/orionleo/dataFort/tree/main/front-end)
- Whatsapp Bot Demo Link can be [found here]( https://drive.google.com/file/d/107VHzNkMihFvJpOT1gdAktwc6ajJsVzL/view?usp=sharing)
- Spartans SOLANA BAsed Token can be [found here](https://explorer.solana.com/address/AaEeWdxbHgegg9XJHQbWzJFj1QmpxJ94rpKXtosQ85Zs?cluster=devnet)

## Technologies Used :
- Drone to Capture Images.
- Naked Mirrorless Camera (Decreasing weight significantly).
- Raspberry Pie.
- Arduino Nano 33 BLE.
- Next.Js, TailwindCSS.
- Decentralized image storage using Ethereum, Polygon, Pinata and IPFS protocols.
- Independent tokens built on Solana blockchain. (Named after our team).
- ML Model To identify crop defect.
- ML Model For map stitching.
- Whatsapp Notification Bot using Twilio Api. 

## Solana Token :
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
