import useReactWeb3ModalContext from './useReactWeb3ModalContext';

const useLoginCallback = () => useReactWeb3ModalContext().login;

export default useLoginCallback;
