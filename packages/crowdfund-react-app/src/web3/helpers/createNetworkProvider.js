import { ethers } from 'ethers';

/**
 * Creates a blockchain network connection provider
 *
 * It will create a web-sockets connection
 * if exists in the configuration and will fallback to http connection
 *
 * @param  {[string]} wsUrl                WEB SOCKETS URL
 * @param  {[string]} rpcUrl               HTTP RPC URL
 * @return {BlockchainProvider}             Blockchain network provider,
 *                                          see ethers.js for documentations
 */
const createNetworkProvider = ({ wsUrl, rpcUrl }) => {
  if (wsUrl) return new ethers.providers.WebSocketProvider(wsUrl);

  return new ethers.providers.StaticJsonRpcProvider(rpcUrl);
};

export default createNetworkProvider;
