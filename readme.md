# AAVE DAI Escrow

This is an AAVE DAI Escrow Dapp built with [Hardhat](https://hardhat.org/).

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

There are a few steps to get setup here:

 - Install [install Node.js](https://nodejs.org/en/)
 - Download this repository locally
 - Open the command line and navigate to your local copy of this repository
 - Run `npm install` to download all the dependencies

## Contracts

You can use hardhat commands to test and compile the contracts, among other things.

To learn more about these commands run `npx hardhat help`.

## Front-End

To run the front-end application:

1. Compile the contracts with `npx hardhat compile` (this will make the artifacts accessible to `/app`)
2. Move into the `app` folder and run `parcel index.html`

You can learn more about Parcel [here](https://parceljs.org/).

### Using the Dapp

To use the Dapp, first install [Metamask](metamask.io) to your browser of choice.

Once you have metamask installed, you should see a connection notice at the top of the Dapp. The Dapp is currently setup to work **only on Kovan**. You can switch to Kovan by clicking on the metamask browser extension.

Once you have switched to Kovan, you will need some Kovan ether to perform any transactions. At the time of writing [this kovan faucet](https://faucet.kovan.network/) works when you sign in with Github.

When you have your Kovan Ether, the next step is to get some Kovan DAI. After all, this is a **DAI Escrow**! One way to do this would be to borrow some from [AAVE](https://testnet.aave.com/dashboard). If you deposit some Kovan ether you can borrow DAI. Then you can use this DAI to create and fund the Escrow contract!

Fill in the **New Contract** fields and then click **Approve DAI & Deploy**. This will have you approve the Escrow to spend your DAI, and then deploy the contract once that transaction has been completed (this may take a moment).

## Tests

The tests are setup to point at already deployed AAVE contracts. We'll need to fork mainnet to do this in our test blockchain.

### Forking Mainnet

In order to fork mainnet, we'll be pointing this repository at an [Alchemy API](https://alchemyapi.io/) endpoint. To do this, you'll need to sign up for Alchemy, create a mainnet project and get your HTTP endpoint.

Once you've done this we'll use [dotenv](https://www.npmjs.com/package/dotenv) to store the endpoint in a local `.env` file that won't accidentally get committed! Since this package is already in your dependencies all you'll need to do is create a new `.env` file at the top level of the repository and add the following entry into it:

```
FORKING_URL=https://eth-mainnet.alchemyapi.io/v2/<YOUR_API_KEY>
```

Replacing `<YOUR_API_KEY>` with the API key from Alchemy.

### Running Tests

The `hardhat.config.js` is already set up to fork mainnet at a recent block.

All we'll need to do to run the tests is run `npx hardhat test`.
