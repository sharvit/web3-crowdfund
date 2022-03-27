import React from 'react';
import { utils as ethersUtils } from 'ethers';

import { useMyTokenContext } from '../../MyTokenProvider';

function TokenInfoSection() {
  const {
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
  } = useMyTokenContext();

  return (
    <>
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
    </>
  );
}

export default TokenInfoSection;
