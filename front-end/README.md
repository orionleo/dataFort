- This is a website built using [Next.js](https://nextjs.org) and TailwindCSS for the front-end.
Solidity is also used to work on the ethereum blockchain, as well as the smart contract is deployed on Polygon-Mumbai Testnet.
The smart contract is deployed on [Remix](https://remix.ethereum.org/)

## Getting Started

- The website is deployed on this link [DataFort](https://data-fort.vercel.app/). 

- A working demo video of the website can be [found here](https://youtu.be/efmwfdekAUE)

- The smart contract _**deployed on polygon+ethereum**_ and its transactions can be viewed [here](https://mumbai.polygonscan.com/address/0x9d544DA3a609D612a203AEE8942B166d58640EA4)

- First it will prompt the user to connect their metamask wallet(s). 

- The website is designed such that the wallet connected will change when the metamask wallet is changed for ease. 

<img width="1673" alt="Screenshot 2023-04-05 at 12 15 07 AM" src="https://user-images.githubusercontent.com/83267766/229893381-eea50e49-c44f-4164-8ee6-8d3e6b150a38.png">

- The user has to select the image they want to upload and upload it. 

- _**Pinata is used to work with the IPFS protocols**_ and upload the image on the ethereum blockchain. 

- A metamask window will open up to confirm the transaction and pay the fees in matic. 

<img width="1680" alt="Screenshot 2023-04-05 at 12 34 25 AM" src="https://user-images.githubusercontent.com/83267766/229894549-42579356-3b18-4597-b12f-579075dae257.png">

- After confirming the transaction, a user can get their own data or data from someone else using their wallet address. 

- If the user doesn't enter any address in the input, then the user's data/image(s) will be displayed. 

<img width="1672" alt="Screenshot 2023-04-05 at 1 56 29 PM" src="https://user-images.githubusercontent.com/83267766/230025200-7fe3e82c-30d2-4fe1-b623-1e9f52961177.png">

- At the bottom is the share button, where a user can add addresses to share with and revoke the access permission with a particular address. 

- For sharing data with a particular address or revoking address from one, it will take some fees again to make changes on the blockchain network.

<img width="543" alt="Screenshot 2023-04-05 at 1 26 36 PM" src="https://user-images.githubusercontent.com/83267766/230017744-dde058cf-7106-4d15-b714-5fe15980d68f.png">

- We have used **pinata** since its a service which _**leverages IPFS protocols and [FileCoin storage network](https://docs.filecoin.io/smart-contracts/fundamentals/overview/)**_ to store images on the blockchain. 

<img width="1008" alt="Screenshot 2023-04-05 at 1 38 22 PM" src="https://user-images.githubusercontent.com/83267766/230020740-eb45ffdf-fef3-48e5-bdda-24020fe7e9fc.png">
