# hardhat-account-abstraction-toolkit

An npm package for account abstraction tooling in Hardhat.

[Hardhat](https://hardhat.org) plugin example.

## What

The hardhat-account-abstraction-toolkit is a plugin that provides a set of tools and commands to enable account abstraction in Hardhat. It simplifies the process of deploying and managing smart contract wallets, as well as deploying entrypoints and account factory contracts.

## Installation

To install the hardhat-account-abstraction-toolkit plugin, follow these steps:
Incase of peer dependecy issues use --force

```bash
npm install hh-acc-abs-toolkit --save-dev
```

Import the plugin in your `hardhat.config.js`:

```js
require("hh-acc-abs-toolkit");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hh-acc-abs-toolkit";
```

## Required plugins

This plugin requires the following Hardhat plugin:

- [@nomiclabs/hardhat-web3](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-web3)

Make sure to install and configure the required plugins before using the account abstraction toolkit.

## Tasks

This plugin introduces the following tasks to Hardhat:

- `initaa`: Deploys and funds smart contract wallets.
- `runbundler`: Runs a bundler locally.
- `deployfactory`: Deploys entrypoint and simple account factory contracts.

## Environment extensions

This plugin extends the Hardhat Runtime Environment by adding the `accountAbstraction` field, which provides access to account abstraction-related functionalities.

## Configuration

The hardhat-account-abstraction-toolkit does not require additional configuration. 

## Usage

To use the account abstraction toolkit, follow these steps:

1. Run the command `npx hardhat initaa` to deploy and fund smart contract wallets.
2. Run the command `npx hardhat runbundler` to run a bundler locally.
3. Run the command `npx hardhat deployfactory` to deploy entrypoint and account factory contracts.

Make sure to have the necessary plugins installed and configured before using these commands.

## License

This npm package is licensed under the [MIT License](LICENSE).