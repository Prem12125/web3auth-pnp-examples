# Web3Auth (`@web3auth/no-modal`) x Polymesh

[![Web3Auth](https://img.shields.io/badge/Web3Auth-SDK-blue)](https://web3auth.io/docs/sdk/pnp/web/no-modal)
[![Web3Auth](https://img.shields.io/badge/Web3Auth-Community-cyan)](https://community.web3auth.io)

[Join our Community Portal](https://community.web3auth.io/) to get support and stay up to date with the latest news and updates.

This example demonstrates how to use Web3Auth with Polkadot.

## How to Use

### One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FWeb3Auth%2Fweb3auth-pnp-examples%2Ftree%2Fmain%2Fweb-no-modal-sdk%2Fblockchain-connection-examples%2Fpolymesh-no-modal-example&project-name=w3a-polymesh-no-modal&repository-name=w3a-polymesh-no-modal)

### Download Manually

```bash
npx degit Web3Auth/web3auth-pnp-examples/web-no-modal-sdk/blockchain-connection-examples/polymesh-no-modal-example w3a-example
```

Install & Run:

```bash
cd w3a-example
npm install
npm run start
# or
cd w3a-example
yarn
yarn start
```

Before you can use "Send Transaction", first click on "Get Signing Key" to retrieve your Polymesh `ss58EncodedKey`. Then visit the [Polymesh Onboarding UI](https://testnet-onboarding.polymesh.live/). Follow the steps to associate your key with an on-chain identity, selecting `MockID` as the CDD Provider. Your key will be assigned a Polymesh DID and your key will be seeded with some test tokens.

## Important Links

- [Website](https://web3auth.io)
- [Docs](https://web3auth.io/docs)
- [Guides](https://web3auth.io/docs/content-hub?type=guides)
- [SDK / API References](https://web3auth.io/docs/sdk)
- [Pricing](https://web3auth.io/pricing.html)
- [Community Portal](https://community.web3auth.io)
