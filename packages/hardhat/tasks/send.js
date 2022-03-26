const {
  utils: { parseUnits },
} = require('ethers');

const { debug, getAccountByAddress, send } = require('./utils');

task('send', 'Send ETH')
  .addParam('from', 'From address or account index')
  .addOptionalParam('to', 'To address or account index')
  .addOptionalParam('amount', 'Amount to send in ether')
  .addOptionalParam('data', 'Data included in transaction')
  .addOptionalParam('gasPrice', 'Price you are willing to pay in gwei')
  .addOptionalParam('gasLimit', 'Limit of how much gas to spend')

  .setAction(async (taskArgs, { network, ethers }) => {
    const from = await getAccountByAddress(ethers, taskArgs.from);
    debug(`Normalized from address: ${from}`);
    const fromSigner = await ethers.provider.getSigner(from);

    let to;
    if (taskArgs.to) {
      to = await getAccountByAddress(ethers, taskArgs.to);
      debug(`Normalized to address: ${to}`);
    }

    const txRequest = {
      from: await fromSigner.getAddress(),
      to,
      value: parseUnits(
        taskArgs.amount ? taskArgs.amount : '0',
        'ether'
      ).toHexString(),
      nonce: await fromSigner.getTransactionCount(),
      gasPrice: parseUnits(
        taskArgs.gasPrice ? taskArgs.gasPrice : '1.001',
        'gwei'
      ).toHexString(),
      gasLimit: taskArgs.gasLimit ? taskArgs.gasLimit : 24000,
      chainId: network.config.chainId,
    };

    if (taskArgs.data !== undefined) {
      txRequest.data = taskArgs.data;
      debug(`Adding data to payload: ${txRequest.data}`);
    }
    debug(`${txRequest.gasPrice / 1000000000} gwei`);
    debug(JSON.stringify(txRequest, null, 2));

    return send(fromSigner, txRequest);
  });
