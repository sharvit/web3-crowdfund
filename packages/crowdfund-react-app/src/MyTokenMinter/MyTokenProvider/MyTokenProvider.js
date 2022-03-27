import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useWeb3Context, useWeb3Connect } from '../../web3';
import { useMyTokenMinter } from './hooks';

import MyTokenContext from './MyTokenContext';

function MyTokenProvider({ children }) {
  const { user } = useWeb3Context();
  const { login, isLoggedIn, loaded } = useWeb3Connect();

  const myToken = useMyTokenMinter();

  const currentPrice = myToken.isMinSupplyMinted
    ? myToken.mintExtraPrice
    : myToken.mintPrice;

  return (
    <MyTokenContext.Provider
      value={useMemo(
        () => ({
          ...myToken,
          user,
          login,
          isLoggedIn,
          loaded,
          currentPrice,
        }),
        [myToken, user, login, isLoggedIn, loaded, currentPrice]
      )}
    >
      {children}
    </MyTokenContext.Provider>
  );
}

MyTokenProvider.propTypes = {
  children: PropTypes.node,
};

MyTokenProvider.defaultProps = {
  children: '',
};

export default MyTokenProvider;
