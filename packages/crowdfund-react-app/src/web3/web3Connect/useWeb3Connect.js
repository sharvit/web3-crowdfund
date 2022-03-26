import { useState, useEffect, useCallback, useMemo } from 'react';

import { logger } from '../../helpers';
import web3ModalSetup from './web3ModalSetup';
import { useWeb3Context } from '../hooks';
import loadUserFromWeb3ModalConnection from './loadUserFromWeb3ModalConnection';

const web3Modal = web3ModalSetup();

const useWeb3Connect = () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { user, setUser } = useWeb3Context();

  const isLoggedIn = useMemo(
    () => user !== undefined && user.signer !== undefined,
    [user]
  );

  const logout = useCallback(async () => {
    await web3Modal.clearCachedProvider();

    if (
      user &&
      user.provider &&
      typeof user.provider.disconnect === 'function'
    ) {
      await user.provider.disconnect();
    }

    setUser({});
  }, [user, setUser]);

  const setUserFromConnection = useCallback(
    async (connection) => {
      const newUser = await loadUserFromWeb3ModalConnection(connection);

      await setUser(newUser);
    },
    [setUser]
  );

  const login = useCallback(async () => {
    try {
      const connection = await web3Modal.connect();

      await setUserFromConnection(connection);

      connection.on('chainChanged', (chainId) => {
        logger.info(`User chain changed to ${chainId}!`);
        setUserFromConnection(connection);
      });
      connection.on('accountsChanged', () => {
        logger.info(`User account changed!`);
        setUserFromConnection(connection);
      });
      connection.on('disconnect', (code, reason) => {
        logger.info(`User disconnected!`, code, reason);
        logout();
      });
    } catch (err) {
      logger.error(err);
      await logout();
    }
  }, [logout, setUserFromConnection]);

  useEffect(() => {
    const loginOnLoad = async () => {
      if (!loaded && !loading && login && setLoading && setLoaded) {
        if (web3Modal.cachedProvider) {
          await setLoading(true);
          await login();
          await setLoading(false);
        }
        await setLoaded(true);
      }
    };
    loginOnLoad();
  }, [setLoaded, setLoading, login]); // eslint-disable-line react-hooks/exhaustive-deps

  return { loaded, login, logout, isLoggedIn, user };
};

export default useWeb3Connect;
