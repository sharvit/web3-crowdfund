import React from 'react';
import PropTypes from 'prop-types';

function UserSection({
  loaded,
  isLoggedIn,
  login,
  walletAddress,
  myTokenBalance,
}) {
  return (
    <>
      {/* Login */}
      {loaded && !isLoggedIn && (
        <div style={{ marginTop: '24px' }}>
          <button type="button" onClick={login}>
            Login
          </button>
        </div>
      )}
      {/* Current balance */}
      {loaded && isLoggedIn && (
        <div style={{ marginTop: '24px' }}>
          <div>Logged in as: {walletAddress}</div>
          <div>You have {myTokenBalance} MyToken tokens</div>
        </div>
      )}
    </>
  );
}

UserSection.propTypes = {
  loaded: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  login: PropTypes.func,
  walletAddress: PropTypes.string,
  myTokenBalance: PropTypes.number,
};

UserSection.defaultProps = {
  loaded: false,
  isLoggedIn: false,
  login: () => undefined,
  walletAddress: '',
  myTokenBalance: 0,
};

export default UserSection;
