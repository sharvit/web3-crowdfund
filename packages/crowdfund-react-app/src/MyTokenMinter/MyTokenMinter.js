import React, { useEffect } from 'react';

import { logger } from '../helpers';
import { useWalletAddress, useChainId } from '../react-web3modal';
import { useGasPrices } from '../react-ethgasstation';

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
  const gasPrices = useGasPrices();

  /**
   * Log wallet address changes
   */
  useEffect(() => {
    if (walletAddress) {
      logger.info(`⛓ Using wallet: ${walletAddress}`);
    }
  }, [walletAddress]);
  /**
   * Log chain-id changes
   */
  useEffect(() => {
    if (chainId) {
      logger.info(`⛓ Using chain-id: ${chainId}`);
    }
  }, [chainId]);
  /**
   * Log gas-prices changes
   */
  useEffect(() => {
    if (gasPrices) {
      logger.info(`⛓ New gas prices have been loaded`);
    }
  }, [gasPrices]);

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
