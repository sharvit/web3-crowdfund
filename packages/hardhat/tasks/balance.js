/*
  eslint-disable
  import/no-extraneous-dependencies, no-restricted-syntax,
  guard-for-in, no-await-in-loop
 */

const chalk = require('chalk');
const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
const EthUtil = require('ethereumjs-util');
const qrcode = require('qrcode-terminal');

const { debug } = require('./utils');

task(
  'balance',
  'Get balance informations for the deployment account.',
  async (_, { ethers }) => {
    try {
      const mnemonic = process.env.SEED_PHRASE;
      debug('mnemonic', mnemonic);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      debug('seed', seed);
      const hdwallet = hdkey.fromMasterSeed(seed);
      const walletHdpath = "m/44'/60'/0'/0/";
      const accountIndex = 0;
      const fullPath = walletHdpath + accountIndex;
      debug('fullPath', fullPath);
      const wallet = hdwallet.derivePath(fullPath).getWallet();
      const privateKey = `0x${wallet._privKey.toString('hex')}`;
      debug('privateKey', privateKey);
      const address = `0x${EthUtil.privateToAddress(wallet._privKey).toString(
        'hex'
      )}`;

      qrcode.generate(address);
      console.log(`‍📬 Deployer Account is ${address}`);
      for (const n in config.networks) {
        try {
          const provider = new ethers.providers.JsonRpcProvider(
            config.networks[n].url
          );
          const balance = await provider.getBalance(address);
          console.log(` -- ${n} --  -- -- 📡 `);
          console.log(`   balance: ${ethers.utils.formatEther(balance)}`);
          console.log(
            `   nonce: ${await provider.getTransactionCount(address)}`
          );
        } catch (e) {
          debug(e);
        }
      }
    } catch (err) {
      console.log(`--- Looks like there is no mnemonic file created yet.`);
      console.log(
        `--- Please run ${chalk.greenBright('yarn generate')} to create one`
      );
    }
  }
);
