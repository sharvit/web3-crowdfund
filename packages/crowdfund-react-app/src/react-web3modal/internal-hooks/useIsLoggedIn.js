import { useMemo } from 'react';

const useIsLoggedIn = (walletAddresses) =>
  useMemo(() => walletAddresses.length > 0, [walletAddresses]);

export default useIsLoggedIn;
