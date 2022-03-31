import React from 'react';

import {
  useWalletAddress,
  useIsLoggedIn,
  useIsLoaded,
  useIsLoading,
  useLoginCallback,
} from '../../../react-web3modal';
import { useMyTokenContext } from '../../MyTokenProvider';

function UserSection() {
  const isLoaded = useIsLoaded();
  const isLoading = useIsLoading();
  const isLoggedIn = useIsLoggedIn();
  const walletAddress = useWalletAddress();
  const login = useLoginCallback();
  const { myTokenBalance } = useMyTokenContext();

  if (!isLoaded || isLoading) return null;

  if (isLoggedIn) {
    return (
      <div style={{ marginTop: '24px' }}>
        <div>Logged in as: {walletAddress}</div>
        <div>You have {myTokenBalance} MyToken tokens</div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '24px' }}>
      <button type="button" onClick={login}>
        Login
      </button>
    </div>
  );
}

export default UserSection;
