import { useCallback } from 'react';

const useLogoutCallback = (web3Modal, provider, setConnection) =>
  useCallback(async () => {
    await web3Modal.clearCachedProvider();

    if (provider && typeof provider.disconnect === 'function') {
      await provider.disconnect();
    }

    setConnection(undefined);
  }, [web3Modal, provider, setConnection]);

export default useLogoutCallback;
