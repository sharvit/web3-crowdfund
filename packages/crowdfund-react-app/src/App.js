import React from 'react';

import { INITIAL_NETWORK_NAME, getNetwork } from './constants';
import contracts from './contracts';
import { Web3Provider } from './web3';
import { ReactWeb3ModalProvider } from './react-web3modal';
import { ReactEthGasStationProvider } from './react-ethgasstation';
import MyTokenMinter from './MyTokenMinter';

import styles from './App.module.css';

const { name, chainId, rpcUrl, wsUrl } = getNetwork(INITIAL_NETWORK_NAME);

const network = {
  name,
  chainId,
  url: wsUrl || rpcUrl,
};

function App() {
  return (
    <div className={styles.App}>
      <Web3Provider network={network} allContractAbis={contracts}>
        <ReactWeb3ModalProvider options={{ cacheProvider: true }}>
          <ReactEthGasStationProvider interval={1000}>
            <MyTokenMinter />
          </ReactEthGasStationProvider>
        </ReactWeb3ModalProvider>
      </Web3Provider>
    </div>
  );
}

export default App;
