import useReactEthersContext from './useReactEthersContext';
import useContract from './useContract';

/**
 * Use a contract reader model
 * @param  {String} name Contract name
 * @return {Object} Contract model
 */
const useContractReader = (name) => {
  const { provider } = useReactEthersContext();

  return useContract(name, provider);
};

export default useContractReader;
