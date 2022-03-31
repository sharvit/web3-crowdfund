import { useCallback } from 'react';
import { useInterval } from '../../hooks';
import { fetchGasPrices } from '../helpers';

/**
 * Fetch new gas prices every X milliseconds
 * @param  {Number}   delay                  Delay in milliseconds
 * @param  {Function} callback               Callback method
 */
const useGasPricesIntervalMonitor = (delay, callback) =>
  useInterval(
    delay,
    useCallback(async () => {
      // eslint-disable-next-line node/no-callback-literal
      callback(await fetchGasPrices());
    }, [callback])
  );

export default useGasPricesIntervalMonitor;
