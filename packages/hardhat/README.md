# @nftools/hardhat

The hardhat package provides:

- Local blockchain for development and testing
- Set of smart contracts (`./contracts`) and deployment scripts (`./deploy`)
- Information about deployed contracts (`./deployments`)
- Set of tasks to interact with the blockchain (`./tasks`)
- Integration with mainnet and test blockchains

## Setup enviorment variables

```sh
cp example.env .env
```

The default seed phrase is:
```
test test test test test test test test test test test test
```

To use a different seed phrase, change the `SEED_PHRASE` variable.

To generate a seed phrase run:
```sh
yarn hardhat generate-seed
```

## Run a development local blockchain

```sh
yarn start
```

## Hardhat Tasks

To see the full list of available tasks run:
```sh
yarn hardhat help
```

**To get help for a specific task run: `yarn hardhat help [task]`**
