import useWeb3Context from './useWeb3Context';

const useProvider = () => useWeb3Context().provider;

export default useProvider;
