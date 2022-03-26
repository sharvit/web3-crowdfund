require('dotenv').config();

require('hardhat-deploy');
require('hardhat-gas-reporter');
require('@tenderly/hardhat-tenderly');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

require('./tasks');

const {
  INFURA_KEY,
  ETHERSCAN_KEY,
  SEED_PHRASE,
  COINMARKETCAP = null,
} = process.env;

module.exports = {
  defaultNetwork: 'localhost',

  networks: {
    hardhat: {
      accounts: {
        mnemonic: SEED_PHRASE,
      },
    },

    localhost: {
      url: 'http://localhost:8545',
      accounts: {
        mnemonic: SEED_PHRASE,
      },
    },

    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
      accounts: {
        mnemonic: SEED_PHRASE,
      },
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      gasPrice: 21 * 1000000000,
      accounts: {
        mnemonic: SEED_PHRASE,
      },
    },
  },

  gasReporter: {
    currency: 'USD',
    coinmarketcap: COINMARKETCAP,
  },

  solidity: {
    compilers: [
      {
        version: '0.8.10',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};
