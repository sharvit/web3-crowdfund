import React, { useState } from 'react';
import { utils as ethersUtils } from 'ethers';

import { useWeb3Context, useWeb3Connect } from '../web3';
import { useMyTokenMinter } from './hooks';
import { UserSection, TokenInfoSection, GasPriceSection } from './components';

function MyTokenMinter() {
  const [amountToMint, setAmountToMint] = useState(1);
  const { user } = useWeb3Context();
  const { login, isLoggedIn, loaded } = useWeb3Connect();

  const {
    myTokenBalance,
    tokenAddress,
    mintingDuration,
    mintPrice,
    mintExtraPrice,
    minSupply,
    extraSupply,
    ownerSupply,
    maxMintPerTransaction,
    supplyMinted,
    isSaleStarted,
    isSaleFinished,
    isSaleActive,
    isMinSupplyMinted,
    isExtraSupplyMinted,
    mint,
    getRefund,
  } = useMyTokenMinter();

  const currentPrice = isMinSupplyMinted ? mintExtraPrice : mintPrice;

  return (
    <div>
      <h1>Home Page</h1>
      <UserSection
        loaded={loaded}
        isLoggedIn={isLoggedIn}
        login={login}
        myTokenBalance={myTokenBalance}
        walletAddress={user?.walletAddress}
      />
      <TokenInfoSection
        tokenAddress={tokenAddress}
        mintingDuration={mintingDuration}
        mintPrice={
          mintPrice ? Number(ethersUtils.formatUnits(mintPrice, 'ether')) : 0
        }
        mintExtraPrice={
          mintPrice
            ? Number(ethersUtils.formatUnits(mintExtraPrice, 'ether'))
            : 0
        }
        minSupply={minSupply}
        extraSupply={extraSupply}
        ownerSupply={ownerSupply}
        maxMintPerTransaction={maxMintPerTransaction}
        supplyMinted={supplyMinted}
        isSaleStarted={isSaleStarted}
        isSaleFinished={isSaleFinished}
        isSaleActive={isSaleActive}
        isMinSupplyMinted={isMinSupplyMinted}
        isExtraSupplyMinted={isExtraSupplyMinted}
      />
      {/* Mint Form */}
      {mintPrice && !isSaleFinished && (
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
      )}
      {/* Refund Form */}
      {isSaleFinished && !isMinSupplyMinted && myTokenBalance > 0 && (
        <div style={{ marginTop: '24px' }}>
          <div>The sale has finished and the goal hasn&apos;t reached</div>
          <div>
            You own {myTokenBalance} tokens and can get a refund of Ξ{' '}
            {ethersUtils.formatUnits((currentPrice * 10).toString(), 'ether')}
          </div>
          <button type="submit" onClick={() => getRefund()}>
            Get Your Money Back NOW
          </button>
        </div>
      )}
      <GasPriceSection />
    </div>
  );
}

export default MyTokenMinter;
