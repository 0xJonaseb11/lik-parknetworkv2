<picture>

  <source media="(prefers-color-scheme: dark)" srcset="https://brown-determined-clam-599.mypinata.cloud/ipfs/QmNvcjzs1DzsLFHsGbt6RYdAwgYj5AwHGz272vMGUAWVKg">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png">
  <img alt="Shows all of the tools in the stack for this template, also listed in the README file." src="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png">
</picture>

<div align="center"><a href="https://www.weparknetwork.com/"><strong>WePark | Parking network powered by Lisk</strong></a></div>
<div align="center"></div>
<br />
<div align="center">
<a href="https://parking-portal.vercel.app/">Live on Vercel</a>
<span>
</div>


## Overview
WePark will enable everyday individuals to rent their spaces on the network. However, in some cases, there are individuals with vacant pieces of land. They can host up to 50 parking spaces and add amenities such as EV chargers. Therefore, we now permit individuals to join the WePark network, list their single space or their parking lot.
Guests can become members and park anywhere on the network of parking spaces/lots for a low monthly fee. The parking simulator shows the transactions that happen as a car parks in a space, leaves a space, and demonstrates that it's real-time, ensuring that availability is always accurate.


## Lisk to Gelato ecosystem
WePark has been integrated on the Lisk testnet with the ParkSpaceNFT, ParkToken, and WeParkMembershipNFT contracts. This integration enables users to mint NFTs for parking spaces and memberships using the Lisk blockchain. 
We Park Network smart contracts, here is a quick overview of how it works:
* The core logic is split into 3 parts, ParkSpaceNFT, WeMembershipNFT, and WeParkNetwork.
* [ParkSpaceNFT](https://sepolia-blockscout.lisk.com/address/0x6288Fa0070e35B3948Bc72938Ca8aE7683d0368E): This is a ERC721 standards NFT smart contract. This is being used to mint parking space-related NFTs only. Only the owner will be able to mint these NFTs.
* [WeMembershipNFT](https://sepolia-blockscout.lisk.com/address/0x0eaDDcf42eE8Deab9906a9c30f731a411C8fDe37): this is also a ERC721 standards NFT smart contract. This will be used to mint membership NFTs only. Users will mint membership NFT by themselves while paying the membership fee.
* [WeParkNetwork](https://sepolia-blockscout.lisk.com/address/0x4CCd1EFDC7e6E77ddacb5E0bc272913F2Cf8c997): This is the core smart contract where I have implemented the core logic of our project. All the available ParkSapce NFTs will be visible here, users will choose their spot/space.


## Quick Start

### Node Version
> Node 18.17.0+

### Structure
```
├── app
│   ├── about
│   ├── account
│   ├── admin
│   ├── dao
│   ├── home
│   ├── join-wepark
│   ├── simulator
│   ├── transactions
│   └── mint
├── backend
│   ├── controllers
│   ├── docs
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── tokens
│   ├── utils
│   └── views
├── components
│   └── ...
├── containers
│   └── ...
├── hooks
│   └── ...
├── public
│   └── ...
├── store
│   └── ...
├── types
│   └── ...
└── utils
    └── ...
```


You can run the website following command: 

```shell
npm install
npm run dev
```

```shell
yarn install
yarn dev
```

```shell
pnpm install
pnpm dev
```

You should now be able to access the application at http://localhost:3000.
