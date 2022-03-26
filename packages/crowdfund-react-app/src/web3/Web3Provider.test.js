import React, { useEffect, useContext } from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { INITIAL_NETWORK_NAME, NETWORKS } from '../constants';
// eslint-disable-next-line jest/no-mocks-import
import MockedEtherProvider from './__mocks__/MockedEtherProvider';
import Web3Provider from './Web3Provider';
import Web3Context from './Web3Context';

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
const networkUrl = NETWORKS[networkKey].wsUrl || NETWORKS[networkKey].rpcUrl;

function Consumer() {
  const { network, provider, user, setUser } = useContext(Web3Context);

  useEffect(() => {
    setUser({
      provider: 'some-provider',
      signer: 'some-signer',
      walletAddress: 'some-wallet-address',
    });
  }, [setUser]);

  return (
    <div>
      <span data-testid="networkName">{network?.name}</span>
      <span data-testid="networkUrl">{provider?.connection.url}</span>
      <span data-testid="userProvider">{user?.provider}</span>
      <span data-testid="userSigner">{user?.signer}</span>
      <span data-testid="userWalletAddress">{user?.walletAddress}</span>
    </div>
  );
}

describe('Web3Provider', () => {
  it('should use the initial network', async () => {
    render(
      <Web3Provider>
        <Consumer />
      </Web3Provider>
    );

    expect(screen.getByTestId('networkName')).toHaveTextContent(networkName);
    expect(screen.getByTestId('networkUrl')).toHaveTextContent(networkUrl);
    await waitFor(() =>
      expect(screen.getByTestId('userProvider')).toHaveTextContent(
        'some-provider'
      )
    );
    await waitFor(() =>
      expect(screen.getByTestId('userSigner')).toHaveTextContent('some-signer')
    );
    await waitFor(() =>
      expect(screen.getByTestId('userWalletAddress')).toHaveTextContent(
        'some-wallet-address'
      )
    );
  });
});
