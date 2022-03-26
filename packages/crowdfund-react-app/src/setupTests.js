/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom/extend-expect';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

process.env.REACT_APP_INITIAL_NETWORK = 'infuraMainnet';

jest.mock('./helpers/logger');
jest.mock(
  './contracts/hardhat_contracts.json',
  () => ({
    1: {
      mainnet: {
        contracts: {},
      },
    },
  }),
  { virtual: true }
);

Enzyme.configure({ adapter: new Adapter() });
