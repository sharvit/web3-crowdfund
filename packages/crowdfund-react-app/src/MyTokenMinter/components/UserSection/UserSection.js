import React from 'react';

import { useMyTokenContext } from '../../MyTokenProvider';

function UserSection() {
  const { loaded, isLoggedIn, login, user, myTokenBalance } =
    useMyTokenContext();

  if (!loaded) return null;

  if (isLoggedIn) {
    return (
      <div style={{ marginTop: '24px' }}>
        <div>Logged in as: {user.walletAddress}</div>
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
