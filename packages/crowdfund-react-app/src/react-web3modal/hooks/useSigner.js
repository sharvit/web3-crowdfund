import { useState, useEffect } from 'react';
import useIsLoggedIn from './useIsLoggedIn';
import useProvider from './useProvider';
import useWalletAddresses from './useWalletAddresses';

const useSigner = (walletIndexOrAddress = 0) => {
  const [signer, setSigner] = useState();
  const isLoggedIn = useIsLoggedIn();
  const provider = useProvider();
  const walletAddresses = useWalletAddresses();

  useEffect(() => {
    const loadSigner = () => {
      if (
        typeof walletIndexOrAddress === 'string' &&
        walletIndexOrAddress.startWith('0x')
      ) {
        setSigner(provider.getSigner(walletIndexOrAddress));
      } else if (typeof walletIndexOrAddress === 'number') {
        setSigner(provider.getSigner(walletAddresses[walletIndexOrAddress]));
      }
    };

    if (provider && isLoggedIn) loadSigner();
  }, [isLoggedIn, provider, walletAddresses, walletIndexOrAddress]);

  return signer;
};

export default useSigner;
