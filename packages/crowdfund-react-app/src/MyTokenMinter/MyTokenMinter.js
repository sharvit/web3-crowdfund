import React, { useEffect } from 'react';

import { logger } from '../helpers';
import { useWalletAddress, useChainId } from '../react-web3modal';

import { MyTokenProvider } from './MyTokenProvider';
import {
  UserSection,
  TokenInfoSection,
  MintFormSection,
  RefundFormSection,
  GasPriceSection,
} from './components';

function MyTokenMinter() {
  const walletAddress = useWalletAddress();
  const chainId = useChainId();

  /**
   * Log wallet address changes
   */
  useEffect(() => {
    if (walletAddress) {
      logger.info(`⛓ Using wallet: ${walletAddress}`);
    }
  }, [walletAddress]);
  /**
   * Log every user change
   */
  useEffect(() => {
    if (chainId) {
      logger.info(`⛓ Using chain-id: ${chainId}`);
    }
  }, [chainId]);

  return (
    <MyTokenProvider>
      <h1>Home Page</h1>
      <UserSection />
      <TokenInfoSection />
      <MintFormSection />
      <RefundFormSection />
      <GasPriceSection />
    </MyTokenProvider>
  );
}

export default MyTokenMinter;
