import React from 'react';
import { utils as ethersUtils } from 'ethers';

import { useMyTokenContext } from '../../MyTokenProvider';

function RefundFormSection() {
  const {
    isSaleFinished,
    isMinSupplyMinted,
    myTokenBalance,
    mintPrice,
    getRefund,
  } = useMyTokenContext();

  if (!isSaleFinished || isMinSupplyMinted || myTokenBalance < 1) return null;

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
      <button type="submit" onClick={() => getRefund()}>
        Get Your Money Back NOW
      </button>
    </div>
  );
}

export default RefundFormSection;
