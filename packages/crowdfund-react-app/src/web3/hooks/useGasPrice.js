import useWeb3Context from './useWeb3Context';

const MULTIPLIER = 100000000;

/**
 * Use gas price
 * @param  {String} [speed='fastest'] Speed to use ('fast' | 'fastest' | 'safeLow' | 'average')
 * @return {Number}                   Gas price
 */
const useGasPrice = (speed = 'fastest') => {
  const { gasPrices } = useWeb3Context();

  if (gasPrices && gasPrices[speed]) {
    return gasPrices[speed] * MULTIPLIER;
  }

  return 0;
};

export default useGasPrice;
