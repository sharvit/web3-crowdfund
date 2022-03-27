import React from 'react';
import { utils as ethersUtils } from 'ethers';

import { useIsLoggedIn } from '../../../react-web3modal';
import { useMyTokenContext } from '../../MyTokenProvider';

function RefundFormSection() {
  const isLoggedIn = useIsLoggedIn();
  const {
    isSaleFinished,
    isMinSupplyMinted,
    myTokenBalance,
    mintPrice,
    getRefund,
  } = useMyTokenContext();

  if (!isSaleFinished || isMinSupplyMinted) return null;

  return (
    <div style={{ marginTop: '24px' }}>
      <div>The sale has finished and the goal hasn&apos;t reached</div>
      <div>
        You own {myTokenBalance} tokens and can get a refund of Ξ{' '}
        {ethersUtils.formatUnits(
          (mintPrice * myTokenBalance).toString(),
          'ether'
        )}
      </div>
      <button
        type="submit"
        onClick={() => getRefund()}
        disabled={!isLoggedIn || myTokenBalance < 1}
      >
        Get Your Money Back NOW
      </button>
    </div>
  );
}

export default RefundFormSection;
