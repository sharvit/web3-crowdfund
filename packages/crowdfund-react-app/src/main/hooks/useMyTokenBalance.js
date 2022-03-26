import { useState } from 'react';

import { useContractReader, useOnBlock, useWeb3Context } from '../../web3';
import { CONTRACT_NAME } from '../../constants';
/**
 * Get the myToken token balance of the logged-in user.
 * Updates every block.
 *
 * @return {number} myToken token balance
 */
const useMyTokenBalance = () => {
  const [balance, setBalance] = useState(0);
  const { provider, user } = useWeb3Context();
  const MyToken = useContractReader(CONTRACT_NAME);

  useOnBlock(
    provider,
    () => {
      const updateBalance = async () => {
        setBalance(Number(await MyToken.balanceOf(user.walletAddress)));
      };
      if (MyToken && user.walletAddress) updateBalance();
    },
    [MyToken, user.walletAddress]
  );

  return balance;
};

export default useMyTokenBalance;
