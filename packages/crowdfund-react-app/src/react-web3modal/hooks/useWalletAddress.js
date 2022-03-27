import useWalletAddresses from './useWalletAddresses';

const useWalletAddress = (index = 0) => useWalletAddresses()[index];

export default useWalletAddress;
