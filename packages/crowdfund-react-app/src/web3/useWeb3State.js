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
   * Contracts defenitions
   */
  contracts: undefined,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'set-network':
      return { ...state, network: payload };
    case 'set-provider':
      return { ...state, provider: payload };
    case 'set-contracts':
      return { ...state, contracts: payload };
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
  setContracts: (payload) =>
    dispatch({
      type: 'set-contracts',
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
