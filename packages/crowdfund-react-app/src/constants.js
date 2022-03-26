export const INFURA_KEY = process.env.REACT_APP_INFURA_KEY || '';
export const QUICKNODE_KEY = process.env.REACT_APP_QUICKNODE_KEY || '';

export const CONTRACT_NAME = 'MyToken';

export const INITIAL_NETWORK_NAME =
  process.env.REACT_APP_INITIAL_NETWORK || 'infuraMainnet';

export const NETWORKS = {
  localhost: {
    name: 'localhost',
    color: '#666666',
    chainId: 31337,
    blockExplorer: '',
    rpcUrl: `http://${
      global.window ? window.location.hostname : 'localhost'
    }:8545`,
  },
  infuraMainnet: {
    name: 'mainnet',
    color: '#ff8b9e',
    chainId: 1,
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    wsUrl: `wss://mainnet.infura.io/ws/v3/${INFURA_KEY}`,
    blockExplorer: 'https://etherscan.io/',
  },
  quicknodeMainnet: {
    name: 'mainnet',
    color: '#ff8b9e',
    chainId: 1,
    rpcUrl: `https://weathered-falling-snow.quiknode.pro/${QUICKNODE_KEY}/`,
    wsRpcUrl: `wss://weathered-falling-snow.quiknode.pro/${QUICKNODE_KEY}/`,
    blockExplorer: 'https://etherscan.io/',
  },
  ropsten: {
    name: 'ropsten',
    color: '#F60D09',
    chainId: 3,
    faucet: 'https://faucet.ropsten.be/',
    blockExplorer: 'https://ropsten.etherscan.io/',
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
    wsUrl: `wss://ropsten.infura.io/ws/v3/${INFURA_KEY}`,
  },
};

export const getNetwork = (network) => NETWORKS[network];
