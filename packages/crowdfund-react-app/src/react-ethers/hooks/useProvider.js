import useReactEthersContext from './useReactEthersContext';

const useProvider = () => useReactEthersContext().provider;

export default useProvider;
