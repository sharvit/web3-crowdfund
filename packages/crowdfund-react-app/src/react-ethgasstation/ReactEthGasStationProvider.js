import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useGasPricesIntervalMonitor } from './hooks';
import ReactEthGasStationContext from './ReactEthGasStationContext';

function ReactEthGasStationProvider({ children, interval }) {
  const [gasPrices, setGasPrices] = useState();

  useGasPricesIntervalMonitor(interval, (newGasPrices) => {
    setGasPrices(newGasPrices);
  });

  return (
    <ReactEthGasStationContext.Provider value={gasPrices}>
      {children}
    </ReactEthGasStationContext.Provider>
  );
}

ReactEthGasStationProvider.propTypes = {
  children: PropTypes.node,
  interval: PropTypes.number,
};

ReactEthGasStationProvider.defaultProps = {
  children: '',
  interval: 1000,
};

export default ReactEthGasStationProvider;
