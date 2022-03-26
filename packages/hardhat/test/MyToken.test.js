/* eslint-disable no-await-in-loop, jest/valid-expect */
const { ethers, waffle } = require('hardhat');
const { use, expect } = require('chai');
const { solidity } = require('ethereum-waffle');

use(solidity);

const wait = async (miliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, miliseconds);
  });

describe('MyToken', () => {
  let myToken;

  const deployContracts = async (mintingDurationInSeconds = 23 * 60 * 60) => {
    const MyTokenFactory = await ethers.getContractFactory('MyToken');

    myToken = await MyTokenFactory.deploy(mintingDurationInSeconds);
  };

  const startSale = async () => {
    const tx = await myToken.startSale();
    await tx.wait();

    return tx;
  };

  const mint = async (signer, amount, payment) => {
    const mintPrice = 0.3;
    const value = payment || mintPrice * amount;

    return myToken.connect(signer).mint(amount, {
      value: ethers.utils.parseEther(value.toString()),
    });
  };

  const mintExtra = async (signer, amount, payment) => {
    const mintPrice = 0.5;
    const value = payment || mintPrice * amount;

    return myToken.connect(signer).mintExtra(amount, {
      value: ethers.utils.parseEther(value.toString()),
    });
  };

  const mintMinSupply = async (signer = null) => {
    const [owner] = await ethers.getSigners();
    const amount = await myToken.MIN_SUPPLY();
    const maxMint = await myToken.MAX_MINT_PER_TRANSACTION();

    for (let i = 0; i < amount / maxMint; i += 1) {
      const mintTx = await mint(signer || owner, maxMint);
      await mintTx.wait();
    }
  };

  const mintExtraSupply = async (signer = null) => {
    const [owner] = await ethers.getSigners();
    const extraSupply = Number(await myToken.EXTRA_SUPPLY());
    const amountToMint = 10;

    for (let i = 0; i < extraSupply / amountToMint; i += 1) {
      const mintTx = await mintExtra(signer || owner, amountToMint);
      await mintTx.wait();
    }
  };

  const getContractBalance = async (contract) =>
    waffle.provider.getBalance(contract.address);

  describe('startSale', () => {
    beforeEach(() => deployContracts(5));

    it('Should allow the onwer to set start the sale', async () => {
      const [owner, addr1] = await ethers.getSigners();

      // start as false
      expect(await myToken.isSaleActive()).to.equal(false);

      // should be reverted if not owner
      await expect(myToken.connect(addr1).startSale()).to.be.revertedWith(
        'Ownable: caller is not the owner'
      );

      // admin should be able to set as true
      const setSaleActiveTx = await myToken.connect(owner).startSale();
      await setSaleActiveTx.wait();
      expect(await myToken.isSaleActive()).to.equal(true);

      // should be reverted if already started
      await expect(myToken.connect(owner).startSale()).to.be.revertedWith(
        'Sale already started'
      );

      // should not be active after minting durations has passed
      await wait(5 * 1000);
      await waffle.provider.send('evm_mine');
      expect(await myToken.isSaleActive()).to.equal(false);
    });
  });

  describe('mint', () => {
    beforeEach(deployContracts);

    it('should require sale to be active when minting', async () => {
      const [, addr1] = await ethers.getSigners();

      await expect(mint(addr1, 1)).to.be.revertedWith('Sale is not active');
    });

    it('should require amount to be less then MAX_MINT_PER_TRANSACTION when minting', async () => {
      const [, addr1] = await ethers.getSigners();

      await startSale();

      await expect(mint(addr1, 11)).to.be.revertedWith(
        'You can only mint 10 tokens at a time'
      );
    });

    it('should require enough supply when minting', async () => {
      const [, addr1] = await ethers.getSigners();

      await startSale();
      await mintMinSupply();

      await expect(mint(addr1, 1)).to.be.revertedWith(
        'Can not mint more than the max supply'
      );
    });

    it('should require to pay enough ethers when minting', async () => {
      const [, addr1] = await ethers.getSigners();

      await startSale();

      await expect(mint(addr1, 1, 0.29999)).to.be.revertedWith(
        'You have not sent enough ETH'
      );
    });

    it('should mint', async () => {
      const [owner, addr1] = await ethers.getSigners();

      await startSale();

      expect(await myToken.supplyMinted()).to.equal(0);
      expect(await myToken.balanceOf(addr1.address)).to.equal(0);
      expect(await myToken.balanceOf(owner.address)).to.equal(0);

      const mintTx = await mint(addr1, 10, 3);
      await mintTx.wait();

      await expect(mintTx).to.changeEtherBalances(
        [addr1, myToken],
        [ethers.utils.parseEther('-3'), ethers.utils.parseEther('3')]
      );

      expect(await myToken.supplyMinted()).to.equal(10);
      expect(await myToken.balanceOf(addr1.address)).to.equal(10);
    });
  });

  describe('mintExtra', () => {
    beforeEach(deployContracts);

    it('should require sale to be active when minting', async () => {
      const [, addr1] = await ethers.getSigners();

      await expect(mintExtra(addr1, 1)).to.be.revertedWith(
        'Sale is not active'
      );
    });

    it('should require the mimimum supply to be minted', async () => {
      const [, addr1] = await ethers.getSigners();

      await startSale();

      await expect(mintExtra(addr1, 1)).to.be.revertedWith(
        'The normal supply has not minted yet'
      );
    });

    it('should require amount to be less then MAX_MINT_PER_TRANSACTION when minting', async () => {
      const [, addr1] = await ethers.getSigners();

      await startSale();

      await expect(mintExtra(addr1, 11)).to.be.revertedWith(
        'You can only mint 10 tokens at a time'
      );
    });

    it('should require enough supply when minting', async () => {
      const [, addr1] = await ethers.getSigners();

      await startSale();
      await mintMinSupply();
      await mintExtraSupply();

      await expect(mintExtra(addr1, 1)).to.be.revertedWith(
        'Can not mint more than the max supply'
      );
    });

    it('should require to pay enough ethers when minting', async () => {
      const [, addr1] = await ethers.getSigners();

      await startSale();

      await expect(mintExtra(addr1, 1, 0.49999)).to.be.revertedWith(
        'You have not sent enough ETH'
      );
    });

    it('should mint extra supply', async () => {
      const [owner, addr1] = await ethers.getSigners();

      await startSale();
      await mintMinSupply();

      expect(await myToken.supplyMinted()).to.equal(100);
      expect(await myToken.balanceOf(addr1.address)).to.equal(0);
      expect(await myToken.balanceOf(owner.address)).to.equal(100);

      const mintTx = await mintExtra(addr1, 10, 5);
      await mintTx.wait();

      await expect(mintTx).to.changeEtherBalances(
        [addr1, myToken],
        [ethers.utils.parseEther('-5'), ethers.utils.parseEther('5')]
      );

      expect(await myToken.supplyMinted()).to.equal(110);
      expect(await myToken.balanceOf(addr1.address)).to.equal(10);
    });
  });

  describe('mintOwner', () => {
    beforeEach(deployContracts);

    it('should allow the owner to mint tokens', async () => {
      const [owner, addr1] = await ethers.getSigners();

      const OWNER_SUPPLY = await myToken.OWNER_SUPPLY();
      const tokensToMintInIteration = 50;

      await expect(myToken.connect(addr1).mintOwner(10)).to.be.revertedWith(
        'Ownable: caller is not the owner'
      );
      await expect(myToken.connect(owner).mintOwner(10)).to.be.revertedWith(
        'The owner can not mint before the normal supply is minted'
      );

      await startSale();
      await mintMinSupply(addr1);

      expect(await myToken.ownerMinted()).to.equal(0);
      expect(await myToken.balanceOf(owner.address)).to.equal(0);

      for (let i = 0; i < OWNER_SUPPLY / tokensToMintInIteration; i += 1) {
        await myToken.connect(owner).mintOwner(tokensToMintInIteration);
      }

      expect(await myToken.balanceOf(owner.address)).to.equal(OWNER_SUPPLY);

      await expect(myToken.connect(owner).mintOwner(1)).to.be.revertedWith(
        'The owner can not mint more than {OWNER_SUPPLY} tokens'
      );
    });
  });

  describe('withdraw', () => {
    beforeEach(() => deployContracts(10));

    it('should require owner when withdrawing', async () => {
      const [, addr1] = await ethers.getSigners();

      await expect(myToken.connect(addr1).withdraw()).to.be.revertedWith(
        'Ownable: caller is not the owner'
      );
    });

    it('should require all token to be minted when withdrawing', async () => {
      const [owner, addr1] = await ethers.getSigners();

      await startSale();

      const mintTx = await mint(addr1, 10, 3);
      await mintTx.wait();

      await expect(myToken.connect(owner).withdraw()).to.be.revertedWith(
        'Goal has not been reached, cannot withdraw funds'
      );
    });

    it('should withdraw', async () => {
      const [owner, addr1] = await ethers.getSigners();

      expect(await getContractBalance(myToken)).to.equal(0);

      await startSale();
      await mintMinSupply(addr1);

      expect(await getContractBalance(myToken)).to.equal(
        ethers.utils.parseEther('30')
      );

      await wait(10 * 1000);
      await waffle.provider.send('evm_mine');

      await expect(
        await myToken.connect(owner).withdraw()
      ).to.changeEtherBalances(
        [owner, myToken],
        [ethers.utils.parseEther('30'), ethers.utils.parseEther('-30')]
      );

      expect(await getContractBalance(myToken)).to.equal(0);
    });
  });

  describe('getRefund', () => {
    beforeEach(() => deployContracts(10));

    it('should require the sale to be finished when asking for refund', async () => {
      const [, addr1] = await ethers.getSigners();

      await expect(myToken.connect(addr1).getRefund()).to.be.revertedWith(
        'Sale is still active'
      );

      await startSale();
      await expect(myToken.connect(addr1).getRefund()).to.be.revertedWith(
        'Sale is still active'
      );

      await mint(addr1, 10);
      await expect(myToken.connect(addr1).getRefund()).to.be.revertedWith(
        'Sale is still active'
      );

      await wait(1 * 1000);
      await waffle.provider.send('evm_mine');
      await expect(myToken.connect(addr1).getRefund()).to.be.revertedWith(
        'Sale is still active'
      );
    });

    it('should revert if goal has reached', async () => {
      const [, addr1] = await ethers.getSigners();

      await startSale();
      await mintMinSupply(addr1);

      await wait(10 * 1000);
      await waffle.provider.send('evm_mine');

      await expect(myToken.connect(addr1).getRefund()).to.be.revertedWith(
        'Goal has been reached! Cannot refund token fee'
      );
    });

    it('should require to be a token holder', async () => {
      const [, addr1, addr2] = await ethers.getSigners();

      await startSale();

      await mint(addr1, 10);

      await wait(10 * 1000);
      await waffle.provider.send('evm_mine');

      await expect(myToken.connect(addr2).getRefund()).to.be.revertedWith(
        'Not a token holder'
      );
    });

    it('should refund token holder', async () => {
      const [, addr1] = await ethers.getSigners();

      await startSale();
      await mint(addr1, 10);

      await wait(10 * 1000);
      await waffle.provider.send('evm_mine');

      expect(await getContractBalance(myToken)).to.equal(
        ethers.utils.parseEther('3')
      );
      expect(await myToken.balanceOf(addr1.address)).to.equal(10);
      await expect(
        await myToken.connect(addr1).getRefund()
      ).to.changeEtherBalances(
        [addr1, myToken],
        [ethers.utils.parseEther('3'), ethers.utils.parseEther('-3')]
      );
      expect(await getContractBalance(myToken)).to.equal(0);
      expect(await myToken.balanceOf(addr1.address)).to.equal(0);
    });

    it('should refund full flow', async () => {
      const signers = await ethers.getSigners();
      // get 5 address to use as minters
      const minters = signers.slice(1, 6);

      await startSale();

      expect(await myToken.totalSupply()).to.equal(0);

      // each minter mint 10 tokens
      await Promise.all(
        minters.map(async (minter) => {
          await mint(minter, 10);
          await expect(await myToken.balanceOf(minter.address)).to.equal(10);
        })
      );

      expect(await myToken.totalSupply()).to.equal(50);
      expect(await getContractBalance(myToken)).to.equal(
        ethers.utils.parseEther('15')
      );

      await expect(myToken.connect(minters[0]).getRefund()).to.be.revertedWith(
        'Sale is still active'
      );

      await wait(10 * 1000);
      await waffle.provider.send('evm_mine');

      await expect(myToken.connect(signers[11]).getRefund()).to.be.revertedWith(
        'Not a token holder'
      );

      // each minter asks for refund
      await Promise.all(
        minters.map(async (minter) => {
          await expect(
            await myToken.connect(minter).getRefund()
          ).to.changeEtherBalances(
            [minter, myToken],
            [ethers.utils.parseEther('3'), ethers.utils.parseEther('-3')]
          );
          await expect(await myToken.balanceOf(minter.address)).to.equal(0);
        })
      );

      expect(await getContractBalance(myToken)).to.equal(0);
      expect(await myToken.totalSupply()).to.equal(0);
    });
  });
});
