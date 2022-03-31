import { useMemo } from 'react';
import { ethers } from 'ethers';

import useWeb3Context from './useWeb3Context';

/**
 * Use a contract reader/writer model
 * @param  {String} name                           Contract name
 * @param  {Object} providerOrSigner               Connection provider for reading contract or
 *                                                 a signer-user to write to contract
 * @return {Object} Contract model
 */
const useContract = (name, providerOrSigner) => {
  const { contractAbis } = useWeb3Context();

  return useMemo(() => {
    if (contractAbis === undefined || contractAbis[name] === undefined) {
      return undefined;
    }

    return new ethers.Contract(
      contractAbis[name].address,
      contractAbis[name].abi,
      providerOrSigner
    );
  }, [name, providerOrSigner, contractAbis]);
};

export default useContract;
