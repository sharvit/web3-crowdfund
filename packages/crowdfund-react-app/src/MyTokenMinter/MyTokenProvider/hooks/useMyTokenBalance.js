import { useState } from 'react';

import { useContractReader, useOnBlock, useWeb3Context } from '../../../web3';
import { useWalletAddress } from '../../../react-web3modal';
import { CONTRACT_NAME } from '../../../constants';
/**
 * Get the myToken token balance of the logged-in user.
 * Updates every block.
 *
 * @return {number} myToken token balance
 */
const useMyTokenBalance = () => {
  const [balance, setBalance] = useState(0);
  const { provider } = useWeb3Context();
  const walletAddress = useWalletAddress();
  const MyToken = useContractReader(CONTRACT_NAME);

  useOnBlock(
    provider,
    () => {
      const updateBalance = async () => {
        setBalance(Number(await MyToken.balanceOf(walletAddress)));
      };
      if (MyToken && walletAddress) updateBalance();
    },
    [MyToken, walletAddress]
  );

  return balance;
};

export default useMyTokenBalance;
