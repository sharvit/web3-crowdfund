import React from 'react';

import Web3Provider from './web3/Web3Provider';
import { ReactWeb3ModalProvider } from './react-web3modal';
import { ReactEthGasStationProvider } from './react-ethgasstation';
import MyTokenMinter from './MyTokenMinter';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <Web3Provider>
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
