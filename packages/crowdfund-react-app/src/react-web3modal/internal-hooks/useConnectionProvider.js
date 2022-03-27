import { useMemo } from 'react';
import { ethers } from 'ethers';

const useConnectionProvider = (connection) =>
  useMemo(
    () =>
      connection ? new ethers.providers.Web3Provider(connection) : undefined,
    [connection]
  );

export default useConnectionProvider;
