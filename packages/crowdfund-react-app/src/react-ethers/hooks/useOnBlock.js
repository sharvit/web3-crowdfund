import { useOnBlock as useOnBlockInternal } from '../internal-hooks';
import useProvider from './useProvider';

/**
 * Run a method on every new block
 * @param  {Object}   provider                      Network provider
 * @param  {Function} callback                      Callback method
 * @param  {Array}    [conditions=[]]               Conditions to consider
 */
const useOnBlock = (callback, conditions = []) => {
  const provider = useProvider();

  return useOnBlockInternal(provider, callback, conditions);
};

export default useOnBlock;
