import React from 'react';

import Web3Provider from './web3/Web3Provider';
import MainPage from './main';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <Web3Provider>
        <MainPage />
      </Web3Provider>
    </div>
  );
}

export default App;
