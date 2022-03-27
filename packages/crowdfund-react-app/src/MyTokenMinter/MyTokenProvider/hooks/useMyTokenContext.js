import { useContext } from 'react';

import MyTokenContext from '../MyTokenContext';

function useMyTokenContext() {
  return useContext(MyTokenContext);
}

export default useMyTokenContext;
