import { useReducer, useMemo } from 'react';

const initialState = {
  /**
   * Blockchain network
   */
  network: {
    /**
     * Name of the blockchain network (mainnet|ropsten|localhost)
     * @type {string}
     */
    name: undefined,
    /**
     * Chain ID number
     * @type {number}
     */
    chainId: undefined,
    /**
     * WEB SOCKETS URL
     * @type {string}
     */
    wsUrl: undefined,
    /**
     * HTTP URL
     * @type {string}
     */
    rpcUrl: undefined,
  },
  /**
   * network provider to read data from the blockchain.
   * Does not need a wallet connection.
   */
  provider: undefined,
  /**
   * User injected by the wallet plugin
   */
  user: {
    /**
     * Network provider to read and write data to/from the blockchain.
     * Need a wallect connection to inject the network provider.
     */
    provider: undefined,
    /**
     * A signer user that can sign transactions
     */
    signer: undefined,
    /**
     * Current logged in wallet address
     */
    walletAddress: undefined,
  },
  /**
   * Contracts defenitions
   */
  contracts: undefined,
  /**
   * Gas prices object
   */
  gasPrices: undefined,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'set-network':
      return { ...state, network: payload };
    case 'set-provider':
      return { ...state, provider: payload };
    case 'set-user':
      return { ...state, user: payload };
    case 'set-contracts':
      return { ...state, contracts: payload };
    case 'set-gas-prices':
      return { ...state, gasPrices: payload };
    default:
      return state;
  }
};

const createActions = (dispatch) => ({
  setNetwork: (payload) =>
    dispatch({
      type: 'set-network',
      payload,
    }),
  setProvider: (payload) =>
    dispatch({
      type: 'set-provider',
      payload,
    }),
  setUser: (payload) =>
    dispatch({
      type: 'set-user',
      payload,
    }),
  setContracts: (payload) =>
    dispatch({
      type: 'set-contracts',
      payload,
    }),
  setGasPrices: (payload) =>
    dispatch({
      type: 'set-gas-prices',
      payload,
    }),
});

const useWeb3State = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useMemo(() => createActions(dispatch), [dispatch]);

  return {
    ...state,
    ...actions,
  };
};

export default useWeb3State;
