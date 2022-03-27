import React from 'react';

import { useGasPrice } from '../../../web3';

function GasPriceSection() {
  const gasPrice = useGasPrice('fastest') || 0;

  return (
    <div style={{ marginTop: '24px' }}>
      <span>
        <span style={{ marginRight: 16 }}>Gas Price:</span>
        <span role="img" aria-label="fuelpump">
          ⛽️
        </span>
      </span>
      {gasPrice / 10 ** 9}g
    </div>
  );
}

export default GasPriceSection;
