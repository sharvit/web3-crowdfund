import { useCallback } from 'react';
import { fetchGasPrices } from '../helpers';
import useOnBlock from './useOnBlock';

/**
 * Fetch new gas prices every block
 * @param  {Object}   provider               Network provider
 * @param  {Function} callback               Callback
 */
const useGasPricesBlockMonitor = (provider, callback) => {
  useOnBlock(
    provider,
    useCallback(async () => {
      // eslint-disable-next-line node/no-callback-literal
      callback(await fetchGasPrices());
    }, [callback])
  );
};

export default useGasPricesBlockMonitor;
