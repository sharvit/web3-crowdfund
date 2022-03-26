import useWeb3Context from './useWeb3Context';
import useContract from './useContract';

/**
 * Use a contract writer model
 * @param  {String} name Contract name
 * @return {Object} Contract model
 */
const useContractWriter = (name) => {
  const { user } = useWeb3Context();

  return useContract(name, user.signer);
};

export default useContractWriter;
