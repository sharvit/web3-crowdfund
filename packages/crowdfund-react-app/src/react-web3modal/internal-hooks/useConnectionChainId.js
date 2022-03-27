import { useState, useEffect, useMemo } from 'react';

import useConnectionEvents from './useConnectionEvents';

const useConnectionChainId = (connection) => {
  const [chainId, setChainId] = useState();

  useEffect(() => {
    if (connection?.chainId) {
      setChainId(Number(connection.chainId));
    }
  }, [connection]);

  useConnectionEvents(
    connection,
    useMemo(
      () => ({
        chainChanged: (newChainId) => {
          setChainId(Number(newChainId));
        },
      }),
      [setChainId]
    )
  );

  return chainId;
};

export default useConnectionChainId;
