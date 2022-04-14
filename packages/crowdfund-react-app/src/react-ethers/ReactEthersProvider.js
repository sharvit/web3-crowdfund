import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useNetworkProvider, useNetworkContractAbis } from './internal-hooks';
import ReactEthersContext from './ReactEthersContext';

function ReactEthersProvider({ children, network, allContractAbis }) {
  const provider = useNetworkProvider(network.url);
  const contractAbis = useNetworkContractAbis(network, allContractAbis);

  return (
    <ReactEthersContext.Provider
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
    </ReactEthersContext.Provider>
  );
}

ReactEthersProvider.propTypes = {
  children: PropTypes.node.isRequired,
  network: PropTypes.shape({
    name: PropTypes.string.isRequired,
    chainId: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  allContractAbis: PropTypes.object.isRequired,
};

export default ReactEthersProvider;
