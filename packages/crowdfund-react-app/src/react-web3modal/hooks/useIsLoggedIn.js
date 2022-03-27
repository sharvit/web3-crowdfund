import useReactWeb3ModalContext from './useReactWeb3ModalContext';

const useIsLoggedIn = () => useReactWeb3ModalContext().isLoggedIn;

export default useIsLoggedIn;
