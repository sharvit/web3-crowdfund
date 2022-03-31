import { useMemo } from 'react';
import useGasPrices from './useGasPrices';

const MULTIPLIER = 100000000;

/**
 * Use gas price
 * @param  {String} [speed='fastest'] Speed to use ('fast' | 'fastest' | 'safeLow' | 'average')
 * @return {Number}                   Gas price
 */
const useGasPrice = (speed = 'fastest') => {
  const gasPrices = useGasPrices();

  return useMemo(() => {
    if (gasPrices && gasPrices[speed]) {
      return gasPrices[speed] * MULTIPLIER;
    }

    return 0;
  }, [gasPrices, speed]);
};

export default useGasPrice;
