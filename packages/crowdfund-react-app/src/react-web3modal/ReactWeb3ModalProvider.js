import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  useWeb3ModalInstance,
  useIsLoggedIn,
  useLogoutCallback,
  useLoginCallback,
  useWeb3ModalLoader,
  useConnectionChainId,
  useConnectionProvider,
  useWalletAddresses,
} from './internal-hooks';
import ReactWeb3ModalContext from './ReactWeb3ModalContext';

function ReactWeb3ModalProvider({ children, options }) {
  const [connection, setConnection] = useState();

  const web3Modal = useWeb3ModalInstance(options);
  const chainId = useConnectionChainId(connection);
  const provider = useConnectionProvider(connection);

  const login = useLoginCallback(web3Modal, setConnection);
  const logout = useLogoutCallback(web3Modal, provider, setConnection);

  const { isLoading, isLoaded } = useWeb3ModalLoader(web3Modal, options, login);

  const walletAddresses = useWalletAddresses(connection, provider, logout);
  const isLoggedIn = useIsLoggedIn(walletAddresses);

  return (
    <ReactWeb3ModalContext.Provider
      value={useMemo(
        () => ({
          isLoaded,
          isLoading,
          login,
          logout,
          isLoggedIn,
          walletAddresses,
          chainId,
          provider,
        }),
        [
          isLoaded,
          isLoading,
          login,
          logout,
          isLoggedIn,
          walletAddresses,
          chainId,
          provider,
        ]
      )}
    >
      {children}
    </ReactWeb3ModalContext.Provider>
  );
}

ReactWeb3ModalProvider.propTypes = {
  children: PropTypes.node,
  options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ReactWeb3ModalProvider.defaultProps = {
  children: '',
  options: {},
};

export default ReactWeb3ModalProvider;
