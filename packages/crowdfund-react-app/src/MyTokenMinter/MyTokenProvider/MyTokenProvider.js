import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useMyTokenMinter } from './hooks';

import MyTokenContext from './MyTokenContext';

function MyTokenProvider({ children }) {
  const myToken = useMyTokenMinter();

  const currentPrice = myToken.isMinSupplyMinted
    ? myToken.mintExtraPrice
    : myToken.mintPrice;

  return (
    <MyTokenContext.Provider
      value={useMemo(
        () => ({
          ...myToken,
          currentPrice,
        }),
        [myToken, currentPrice]
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
