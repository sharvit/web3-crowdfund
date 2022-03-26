const {
  utils: { isAddress, getAddress },
} = require('ethers');

const debug = (...args) => {
  if (process.env.DEBUG) {
    console.log(...args);
  }
};

const send = (signer, txparams) =>
  signer.sendTransaction(txparams, (error, transactionHash) => {
    if (error) {
      debug(`Error: ${error}`);
    }
    debug(`transactionHash: ${transactionHash}`);
  });

const getAccountByAddress = async (ethers, address) => {
  if (isAddress(address)) {
    return getAddress(address);
  }
  const accounts = await ethers.provider.listAccounts();
  if (accounts[address] !== undefined) {
    return accounts[address];
  }
  throw new Error(`Could not normalize addressess: ${address}`);
};

module.exports = { debug, send, getAccountByAddress };
