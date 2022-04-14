import useContract from './useContract';

/**
 * Use a contract writer model
 * @param  {String} name Contract name
 * @param  {Object} signer user signer
 * @return {Object} Contract model
 */
const useContractWriter = (name, signer) => useContract(name, signer);

export default useContractWriter;
