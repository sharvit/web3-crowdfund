import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';

const useWeb3ModalInstance = (options) => {
  const [web3Modal, setWeb3Modal] = useState(undefined);

  useEffect(() => {
    setWeb3Modal(new Web3Modal(options || {}));
  }, [options]);

  return web3Modal;
};

export default useWeb3ModalInstance;
