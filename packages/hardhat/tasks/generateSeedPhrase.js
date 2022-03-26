/* eslint-disable import/no-extraneous-dependencies */

const chalk = require('chalk');
const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
const EthUtil = require('ethereumjs-util');

const { debug } = require('./utils');

task('generate-seed', 'Create a mnemonic for builder deploys', async () => {
  const mnemonic = bip39.generateMnemonic(256);
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

  console.log(`\n${chalk.bold('Account Generated')}\n`);
  console.log(`🔐 Seed Phrase:\n\n${chalk.magenta(mnemonic)}\n`);
  console.log(`🔐 Address: ${chalk.magenta(address)}`);
  console.log(`🔐 Private Key: ${chalk.magenta(privateKey)}`);
  console.log(
    "\n💬 Use 'yarn run account' to get more information about the deployment account.\n"
  );
});
