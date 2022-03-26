import { ethers } from 'ethers';

const loadUserFromWeb3ModalConnection = async (connection) => {
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const walletAddress = await signer.getAddress();

  return {
    provider,
    signer,
    walletAddress,
  };
};

export default loadUserFromWeb3ModalConnection;
