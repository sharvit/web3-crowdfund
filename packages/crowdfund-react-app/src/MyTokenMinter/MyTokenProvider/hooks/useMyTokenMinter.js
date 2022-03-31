import { useState, useEffect, useCallback } from 'react';

import { CONTRACT_NAME } from '../../../constants';
import {
  useContractReader,
  useContractWriter,
  useOnBlock,
} from '../../../web3';
import { useSigner } from '../../../react-web3modal';

import useMyTokenBalance from './useMyTokenBalance';

/**
 * Use the myToken minter.
 *
 * Returns an object that contains:
 * - All the contract constants
 * - All the contract views updated every block
 * - All the contract functions
 *
 * @return {Object} myToken-minter
 */
const useMyTokenMinter = () => {
  const [constants, setConstants] = useState({});
  const [state, setState] = useState({});

  const signer = useSigner();
  const myTokenBalance = useMyTokenBalance();

  const myTokenMinterReader = useContractReader(CONTRACT_NAME);
  const myTokenMinterWriter = useContractWriter(CONTRACT_NAME, signer);

  /*
   * Loads contract constants
   */
  useEffect(() => {
    const updateConstants = async () => {
      setConstants({
        tokenAddress: await myTokenMinterReader.address,
        mintingDuration: Number(await myTokenMinterReader.mintingDuration()),
        mintPrice: await myTokenMinterReader.MINT_PRICE(),
        mintExtraPrice: await myTokenMinterReader.MINT_EXTRA_PRICE(),
        minSupply: Number(await myTokenMinterReader.MIN_SUPPLY()),
        extraSupply: Number(await myTokenMinterReader.EXTRA_SUPPLY()),
        ownerSupply: Number(await myTokenMinterReader.OWNER_SUPPLY()),
        maxMintPerTransaction: Number(
          await myTokenMinterReader.MAX_MINT_PER_TRANSACTION()
        ),
      });
    };
    if (myTokenMinterReader) {
      updateConstants();
    }
  }, [myTokenMinterReader]);

  /**
   * Load contract views
   */
  useOnBlock(() => {
    const updateState = async () => {
      setState({
        supplyMinted: Number(await myTokenMinterReader.supplyMinted()),
        ownerMinted: Number(await myTokenMinterReader.ownerMinted()),
        saleStartedAt: Number(await myTokenMinterReader.saleStartedAt()),
        isSaleStarted: await myTokenMinterReader.isSaleStarted(),
        isSaleFinished: await myTokenMinterReader.isSaleFinished(),
        isSaleActive: await myTokenMinterReader.isSaleActive(),
        isMinSupplyMinted: await myTokenMinterReader.isMinSupplyMinted(),
        isExtraSupplyMinted: await myTokenMinterReader.isExtraSupplyMinted(),
      });
    };
    if (myTokenMinterReader) {
      updateState();
    }
  }, [myTokenMinterReader]);

  /**
   * Mint new tokens
   */
  const mint = useCallback(
    (amount) => {
      const currentPrice = state.isMinSupplyMinted
        ? constants.mintExtraPrice
        : constants.mintPrice;
      const mintMethod = state.isMinSupplyMinted ? 'mintExtra' : 'mint';
      // eslint-disable-next-line no-undef
      const price = currentPrice.toBigInt() * BigInt(amount);

      return myTokenMinterWriter[mintMethod](amount, { value: price });
    },
    [myTokenMinterWriter, state, constants]
  );

  /**
   * Get refund and burn tokens
   */
  const getRefund = useCallback(
    () => myTokenMinterWriter.getRefund(),
    [myTokenMinterWriter]
  );

  return { ...constants, ...state, myTokenBalance, mint, getRefund };
};

export default useMyTokenMinter;
