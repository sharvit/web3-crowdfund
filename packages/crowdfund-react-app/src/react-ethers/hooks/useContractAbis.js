import useReactEthersContext from './useReactEthersContext';

const useContractAbis = () => useReactEthersContext().contractAbis;

export default useContractAbis;
