import { useState, useMemo, useEffect } from 'react';

const useWeb3ModalLoader = (web3Modal, web3ModalOptions, login) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const shouldLoadFromCache = useMemo(
    () =>
      web3ModalOptions?.cacheProvider === true &&
      web3Modal?.cachedProvider !== undefined,
    [web3ModalOptions?.cacheProvider, web3Modal?.cachedProvider]
  );

  useEffect(() => {
    const load = async () => {
      if (shouldLoadFromCache) {
        await setIsLoading(true);
        await login();
        await setIsLoading(false);
      }
      await setIsLoaded(true);
    };
    if (web3Modal !== undefined && !isLoaded && !isLoading) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Modal, shouldLoadFromCache, setIsLoaded, setIsLoading, login]);

  return { isLoaded, isLoading };
};

export default useWeb3ModalLoader;
