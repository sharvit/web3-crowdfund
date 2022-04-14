import useReactEthersContext from './useReactEthersContext';

const useNetwork = () => useReactEthersContext().network;

export default useNetwork;
