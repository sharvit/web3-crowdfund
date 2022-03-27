import React from 'react';
import PropTypes from 'prop-types';

function TokenInfoSection({
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
}) {
  return (
    <>
      {/* Addresses */}
      <div style={{ marginTop: '24px' }}>
        <div>MyToken address: {tokenAddress}</div>
      </div>
      {/* Constants */}
      <div style={{ marginTop: '24px' }}>
        <div>Minting Duration: {mintingDuration} seconds</div>
        <div>Mint Price: {mintPrice && `Ξ ${mintPrice}`}</div>
        <div>Mint Extra Price: {mintExtraPrice && `Ξ ${mintExtraPrice}`}</div>
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

TokenInfoSection.propTypes = {
  tokenAddress: PropTypes.string,
  mintingDuration: PropTypes.number,
  mintPrice: PropTypes.number,
  mintExtraPrice: PropTypes.number,
  minSupply: PropTypes.number,
  extraSupply: PropTypes.number,
  ownerSupply: PropTypes.number,
  maxMintPerTransaction: PropTypes.number,
  supplyMinted: PropTypes.number,
  isSaleStarted: PropTypes.bool,
  isSaleFinished: PropTypes.bool,
  isSaleActive: PropTypes.bool,
  isMinSupplyMinted: PropTypes.bool,
  isExtraSupplyMinted: PropTypes.bool,
};

TokenInfoSection.defaultProps = {
  tokenAddress: '',
  mintingDuration: 0,
  mintPrice: 0,
  mintExtraPrice: 0,
  minSupply: 0,
  extraSupply: 0,
  ownerSupply: 0,
  maxMintPerTransaction: 0,
  supplyMinted: 0,
  isSaleStarted: false,
  isSaleFinished: false,
  isSaleActive: false,
  isMinSupplyMinted: false,
  isExtraSupplyMinted: false,
};

export default TokenInfoSection;
