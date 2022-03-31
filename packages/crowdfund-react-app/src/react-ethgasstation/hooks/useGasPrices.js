import { useContext } from 'react';

import ReactEthGasStationContext from '../ReactEthGasStationContext';

const useGasPrices = () => useContext(ReactEthGasStationContext);

export default useGasPrices;
