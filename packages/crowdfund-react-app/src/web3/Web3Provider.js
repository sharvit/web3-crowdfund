import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useNetworkProvider, useNetworkContractAbis } from './internal-hooks';
import Web3Context from './Web3Context';

function Web3Provider({ children, network, allContractAbis }) {
  const provider = useNetworkProvider(network.url);
  const contractAbis = useNetworkContractAbis(network, allContractAbis);

  return (
    <Web3Context.Provider
      value={useMemo(
        () => ({
          network,
          provider,
          contractAbis,
        }),
        [network, provider, contractAbis]
      )}
    >
      {children}
    </Web3Context.Provider>
  );
}

Web3Provider.propTypes = {
  children: PropTypes.node.isRequired,
  network: PropTypes.shape({
    name: PropTypes.string.isRequired,
    chainId: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  allContractAbis: PropTypes.object.isRequired,
};

export default Web3Provider;
