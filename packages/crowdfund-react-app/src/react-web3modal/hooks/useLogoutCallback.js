import useReactWeb3ModalContext from './useReactWeb3ModalContext';

const useLogoutCallback = () => useReactWeb3ModalContext().logout;

export default useLogoutCallback;
