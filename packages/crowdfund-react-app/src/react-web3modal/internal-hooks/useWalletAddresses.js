import { useState, useEffect, useMemo } from 'react';
import useConnectionEvents from './useConnectionEvents';

const useWalletAddresses = (connection, provider, logout) => {
  const [walletAddresses, setWalletAddresses] = useState([]);

  useEffect(() => {
    const loadWalletAddresses = async () => {
      setWalletAddresses(await provider.listAccounts());
    };
    if (provider) {
      loadWalletAddresses();
    } else if (walletAddresses.length > 0) {
      setWalletAddresses([]);
    }
  }, [provider]); // eslint-disable-line react-hooks/exhaustive-deps

  useConnectionEvents(
    connection,
    useMemo(
      () => ({
        accountsChanged: (newWalletAddresses) => {
          if (newWalletAddresses.length > 0) {
            setWalletAddresses(newWalletAddresses);
          } else {
            logout();
          }
        },
        disconnect: () => {
          logout();
        },
      }),
      [setWalletAddresses, logout]
    )
  );

  return walletAddresses;
};

export default useWalletAddresses;
