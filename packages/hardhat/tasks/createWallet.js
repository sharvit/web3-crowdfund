const chalk = require('chalk');
const qrcode = require('qrcode-terminal');

task('create-wallet', 'Create a wallet', async (_, { ethers }) => {
  const randomWallet = ethers.Wallet.createRandom();

  const { address } = randomWallet;
  const { privateKey } = randomWallet._signingKey();

  qrcode.generate(address, { small: true });
  console.log(`🔐 Address: ${chalk.magenta(address)}`);
  console.log(`🔐 Private Key: ${chalk.magenta(privateKey)}`);
});
