import { useState, useEffect } from 'react';
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
  const [contract, setContract] = useState();
  const { contracts } = useWeb3Context();

  useEffect(() => {
    if (contracts && contracts[name]) {
      setContract(
        new ethers.Contract(
          contracts[name].address,
          contracts[name].abi,
          providerOrSigner
        )
      );
    }
  }, [name, providerOrSigner, contracts]);

  return contract;
};

export default useContract;
