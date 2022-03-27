import React from 'react';

import { MyTokenProvider } from './MyTokenProvider';
import {
  UserSection,
  TokenInfoSection,
  MintFormSection,
  RefundFormSection,
  GasPriceSection,
} from './components';

function MyTokenMinter() {
  return (
    <MyTokenProvider>
      <h1>Home Page</h1>
      <UserSection />
      <TokenInfoSection />
      <MintFormSection />
      <RefundFormSection />
      <GasPriceSection />
    </MyTokenProvider>
  );
}

export default MyTokenMinter;
