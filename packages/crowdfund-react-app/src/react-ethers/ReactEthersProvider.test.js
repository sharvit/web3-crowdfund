import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';

import { INITIAL_NETWORK_NAME, NETWORKS } from '../constants';
import contracts from '../contracts';
// eslint-disable-next-line jest/no-mocks-import
import MockedEtherProvider from './__mocks__/MockedEtherProvider';
import ReactEthersProvider from './ReactEthersProvider';
import ReactEthersContext from './ReactEthersContext';

jest.mock('ethers', () => ({
  ethers: {
    providers: {
      WebSocketProvider: MockedEtherProvider,
      StaticJsonRpcProvider: MockedEtherProvider,
    },
  },
}));

const networkKey = INITIAL_NETWORK_NAME;
const networkName = NETWORKS[networkKey].name;
const networkChainId = NETWORKS[networkKey].chainId;
const networkUrl = NETWORKS[networkKey].wsUrl || NETWORKS[networkKey].rpcUrl;

const networkProp = {
  name: networkName,
  chainId: networkChainId,
  url: networkUrl,
};

function Consumer() {
  const { network, provider } = useContext(ReactEthersContext);

  return (
    <div>
      <span data-testid="networkName">{network?.name}</span>
      <span data-testid="networkUrl">{provider?.connection.url}</span>
    </div>
  );
}

describe('ReactEthersProvider', () => {
  it('should use the initial network', async () => {
    render(
      <ReactEthersProvider network={networkProp} allContractAbis={contracts}>
        <Consumer />
      </ReactEthersProvider>
    );

    expect(screen.getByTestId('networkName')).toHaveTextContent(networkName);
    expect(screen.getByTestId('networkUrl')).toHaveTextContent(networkUrl);
  });
});
