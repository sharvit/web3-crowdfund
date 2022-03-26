import React, { useState } from 'react';
import { utils as ethersUtils } from 'ethers';

import { useGasPrice, useWeb3Context, useWeb3Connect } from '../web3';
import { useMyTokenMinter } from './hooks';

function MyTokenMinter() {
  const [amountToMint, setAmountToMint] = useState(1);
  const gasPrice = useGasPrice('fastest');
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
          <div>Logged in as: {user.walletAddress}</div>
          <div>You have {myTokenBalance} MyToken tokens</div>
        </div>
      )}
      {/* Addresses */}
      <div style={{ marginTop: '24px' }}>
        <div>MyToken address: {tokenAddress}</div>
      </div>
      {/* Constants */}
      <div style={{ marginTop: '24px' }}>
        <div>Minting Duration: {mintingDuration} seconds</div>
        <div>
          Mint Price:{' '}
          {mintPrice && `Ξ ${ethersUtils.formatUnits(mintPrice, 'ether')}`}
        </div>
        <div>
          Mint Extra Price:{' '}
          {mintExtraPrice &&
            `Ξ ${ethersUtils.formatUnits(mintExtraPrice, 'ether')}`}
        </div>
        <div>Minimum Supply: {minSupply}</div>
        <div>Extra Supply: {extraSupply}</div>
        <div>Owner Supply: {ownerSupply}</div>
        <div>Max Mint Per Transaction: {maxMintPerTransaction}</div>
      </div>
      {/* Live Information */}
      <div style={{ marginTop: '24px' }}>
        <div>Supply Minted: {supplyMinted}</div>
        <div>Sale Started? {isSaleStarted ? 'Yes' : 'No'}</div>
        <div>Sale Finished? {isSaleFinished ? 'Yes' : 'No'}</div>
        <div>Sale Active? {isSaleActive ? 'Yes' : 'No'}</div>
        <div>Min supply minted? {isMinSupplyMinted ? 'Yes' : 'No'}</div>
        <div>Extra supply minted? {isExtraSupplyMinted ? 'Yes' : 'No'}</div>
      </div>
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
      {/* Gas price */}
      <div style={{ marginTop: '24px' }}>
        <span>
          <span style={{ marginRight: 16 }}>Gas Price:</span>
          <span role="img" aria-label="fuelpump">
            ⛽️
          </span>
        </span>
        {typeof gasPrice === 'undefined' ? 0 : parseInt(gasPrice, 10) / 10 ** 9}
        g
      </div>
    </div>
  );
}

export default MyTokenMinter;
