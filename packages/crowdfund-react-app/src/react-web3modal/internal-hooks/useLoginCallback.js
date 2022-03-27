import { useCallback } from 'react';

const useLoginCallback = (web3Modal, setConnection) =>
  useCallback(async () => {
    setConnection(await web3Modal.connect());
  }, [web3Modal, setConnection]);

export default useLoginCallback;
