import { useMemo } from 'react';
import { ethers } from 'ethers';

const useNetworkProvider = (url) =>
  useMemo(() => {
    if (url.startsWith('http')) {
      return new ethers.providers.StaticJsonRpcProvider(url);
    }
    if (url.startsWith('ws')) {
      return new ethers.providers.WebSocketProvider(url);
    }
    return undefined;
  }, [url]);

export default useNetworkProvider;
