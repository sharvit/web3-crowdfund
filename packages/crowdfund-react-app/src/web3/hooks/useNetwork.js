import useWeb3Context from './useWeb3Context';

const useNetwork = () => useWeb3Context().network;

export default useNetwork;
