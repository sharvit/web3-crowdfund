import { useEffect, useLayoutEffect, useRef } from 'react';
import contracts from '../../contracts';

/**
 * Use to load contracts abi of a network
 * @param  {String}   networkName               Network name
 * @param  {Function} callback                  Callback function
 * @return {Object}               Contracts abis
 */
const useContractsLoader = (network, callback) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const { name, chainId } = network;

    if (name !== undefined && chainId !== undefined) {
      savedCallback.current(contracts[chainId][name].contracts);
    }
  }, [network]);
};

export default useContractsLoader;
