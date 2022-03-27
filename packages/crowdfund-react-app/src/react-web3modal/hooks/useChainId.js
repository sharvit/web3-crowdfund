import useReactWeb3ModalContext from './useReactWeb3ModalContext';

const useChainId = () => useReactWeb3ModalContext().chainId;

export default useChainId;
