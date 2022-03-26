/*
  eslint-disable

  import/no-extraneous-dependencies,
  no-await-in-loop
 */

const chalk = require('chalk');
const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
const EthUtil = require('ethereumjs-util');
const rlp = require('rlp');
const keccak = require('keccak');

const { debug } = require('./utils');

task(
  'mineContractAddress',
  'Looks for a deployer account that will give leading zeros'
)
  .addParam('searchFor', 'String to search for')
  .setAction(async (taskArgs) => {
    let contractAddress = '';
    let address;

    let mnemonic = '';
    while (contractAddress.indexOf(taskArgs.searchFor) !== 0) {
      mnemonic = bip39.generateMnemonic();
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
      address = `0x${EthUtil.privateToAddress(wallet._privKey).toString(
        'hex'
      )}`;

      const nonce = 0x00; // The nonce must be a hex literal!
      const sender = address;

      const inputArr = [sender, nonce];
      const rlpEncoded = rlp.encode(inputArr);

      const contractAddressLong = keccak('keccak256')
        .update(rlpEncoded)
        .digest('hex');

      contractAddress = contractAddressLong.substring(24); // Trim the first 24 characters.
    }

    console.log(`⛏  Account Mined as ${address}`);
    console.log(
      `📜 This will create the first contract: ${chalk.magenta(
        `0x${contractAddress}`
      )}`
    );
    console.log(`🔐 Seed Phrase:\n\t${chalk.magenta(mnemonic)}\n`);
    console.log(
      "💬 Use 'yarn run account' to get more information about the deployment account."
    );
  });
