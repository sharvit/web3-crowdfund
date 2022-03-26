import useWeb3Context from './useWeb3Context';
import useContract from './useContract';

/**
 * Use a contract reader model
 * @param  {String} name Contract name
 * @return {Object} Contract model
 */
const useContractReader = (name) => {
  const { provider } = useWeb3Context();

  return useContract(name, provider);
};

export default useContractReader;
