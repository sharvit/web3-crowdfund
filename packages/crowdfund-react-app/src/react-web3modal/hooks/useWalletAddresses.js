import useReactWeb3ModalContext from './useReactWeb3ModalContext';

const useWalletAddresses = () => useReactWeb3ModalContext().walletAddresses;

export default useWalletAddresses;
