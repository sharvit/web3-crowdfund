task(
  'start-sale',
  'Start my-token sale',
  async (_, { ethers, deployments }) => {
    const owner = await ethers.getSigner();
    const MyToken = await deployments.get('MyToken');

    const myToken = new ethers.Contract(MyToken.address, MyToken.abi, owner);

    await myToken.startSale();

    console.log('Sale started!');
  }
);
