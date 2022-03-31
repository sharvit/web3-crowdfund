import useWeb3Context from './useWeb3Context';

const useContractAbis = () => useWeb3Context().contractAbis;

export default useContractAbis;
