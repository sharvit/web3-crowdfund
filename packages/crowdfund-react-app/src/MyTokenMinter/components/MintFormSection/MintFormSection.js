import React, { useState } from 'react';
import { utils as ethersUtils } from 'ethers';

import { useIsLoggedIn } from '../../../react-web3modal';
import { useMyTokenContext } from '../../MyTokenProvider';

function MintFormSection() {
  const [amountToMint, setAmountToMint] = useState(1);
  const isLoggedIn = useIsLoggedIn();
  const {
    mintPrice,
    isSaleFinished,
    maxMintPerTransaction,
    currentPrice,
    isSaleActive,
    mint,
  } = useMyTokenContext();

  if (!mintPrice || isSaleFinished) return null;

  return (
    <div style={{ marginTop: '24px' }}>
      <label htmlFor="amountToMint">
        <div>Amount to mint</div>
        <input
          id="amountToMint"
          type="number"
          min="1"
          max={maxMintPerTransaction}
          defaultValue={1}
          onChange={(e) => setAmountToMint(Number(e.target.value))}
        />
      </label>
      <div>
        Price: Ξ{' '}
        {ethersUtils.formatUnits(
          (currentPrice * amountToMint).toString(),
          'ether'
        )}
      </div>
      <button
        type="submit"
        disabled={!isSaleActive || !isLoggedIn}
        onClick={() => mint(amountToMint)}
      >
        Mint Now
      </button>
    </div>
  );
}

export default MintFormSection;
