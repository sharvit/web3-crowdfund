import { useMemo } from 'react';

const useNetworkContractAbis = (network, contractAbis) =>
  useMemo(() => {
    const { name, chainId } = network;

    if (
      contractAbis === undefined ||
      name === undefined ||
      chainId === undefined
    ) {
      return undefined;
    }

    return contractAbis[chainId][name].contracts;
  }, [network, contractAbis]);

export default useNetworkContractAbis;
