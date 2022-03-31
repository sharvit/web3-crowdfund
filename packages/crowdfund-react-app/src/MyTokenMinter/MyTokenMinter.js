import React, { useEffect } from 'react';

import { logger } from '../helpers';
import { useOnBlock, useNetwork } from '../web3';
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
  const network = useNetwork();
  const walletAddress = useWalletAddress();
  const chainId = useChainId();
  const gasPrices = useGasPrices();

  /**
   * Log network changes
   */
  useEffect(() => {
    logger.info(
      `⛓ Using the ${network.name} network, chainId is ${network.chainId}`
    );
  }, [network]);
  /**
   * Log wallet address changes
   */
  useEffect(() => {
    if (walletAddress) {
      logger.info(`⛓ Using wallet: ${walletAddress}`);
    }
  }, [walletAddress]);
  /**
   * Log wallet chain-id changes
   */
  useEffect(() => {
    if (chainId) {
      logger.info(`⛓ Wallet connected to chain-id: ${chainId}`);
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
  /**
   * Log every block
   */
  useOnBlock((blockNumber) => {
    logger.info(`⛓ A new ${network.name} block is here: ${blockNumber}`);
  }, []);

  return (
    <MyTokenProvider>
      <h1>Mint MyToken</h1>
      <UserSection />
      <TokenInfoSection />
      <MintFormSection />
      <RefundFormSection />
      <GasPriceSection />
    </MyTokenProvider>
  );
}

export default MyTokenMinter;
