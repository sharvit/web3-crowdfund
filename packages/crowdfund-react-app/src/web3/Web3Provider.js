import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { INITIAL_NETWORK_NAME, getNetwork } from '../constants';
import { logger } from '../helpers';
import { createNetworkProvider } from './helpers';
import { useOnBlock, useContractsLoader } from './hooks';
import useWeb3State from './useWeb3State';
import Web3Context from './Web3Context';

function Web3Provider({ children }) {
  const {
    network,
    provider,
    contracts,
    setNetwork,
    setProvider,
    setContracts,
  } = useWeb3State();
  /**
   * Set new newtork provider when changing network name
   */
  useEffect(() => {
    const newNetwork = getNetwork(INITIAL_NETWORK_NAME);
    const newProvider = createNetworkProvider(newNetwork);

    logger.info(`⛓ Using the ${newNetwork.name} network`);

    setNetwork(newNetwork);
    setProvider(newProvider);
  }, [setNetwork, setProvider]);
  /**
   * Load contracts
   */
  useContractsLoader(network, (newContracts) => {
    logger.info(`⛓ Contracts loaded for the ${network.name} network`);
    setContracts(newContracts);
  });
  /**
   * Log every block
   */
  useOnBlock(provider, (blockNumber) => {
    logger.info(`⛓ A new ${network.name} block is here: ${blockNumber}`);
  });

  return (
    <Web3Context.Provider
      value={useMemo(
        () => ({
          network,
          provider,
          contracts,
        }),
        [network, provider, contracts]
      )}
    >
      {children}
    </Web3Context.Provider>
  );
}

Web3Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Web3Provider;
