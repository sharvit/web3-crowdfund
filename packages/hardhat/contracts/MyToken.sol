// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title MyToken
 * @dev This contract allows you to crowdfund my project
 *
 * I am looking to raise a minimum of 40 ethers for 20% of the current token supply.
 *
 * 1. First 100 tokens will be minted for a price of 0.4 ether each.
 *
 * 2. Extra 50 tokens will be minted for a price of 0.5 ether each.
 *
 * 3. The owner will mint 400 tokens and
 *    can only do so after 100 tokens have been sold.
 *
 * 4. The minting phase will end after 2 weeks or when all
 *    tokens have been sold, the first of them to happen.
 *    After that, it will not be possible to mint more tokens.
 *
 * 5. The contract owner can only withdraw the funds
 *    when the sale ends and a minimum of 100 tokens have been sold.
 *
 * 6. If the minting phase ends,
 *    and the minimum mint target of 100 tokens has not been reached,
 *    the minters can claim a 100% refund and burn their tokens.
 *
 */
contract MyToken is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using Address for address payable;
    using SafeMath for uint256;

    /**
     * Token Price
     */
    uint256 public constant MINT_PRICE = 0.3 ether;
    /**
     * Token price for the extra supply
     */
    uint256 public constant MINT_EXTRA_PRICE = 0.5 ether;
    /**
     * The minimum amount of tokens that should be sold.
     * This is the goal of the current phase,
     * if not reached, token holders can ask for refund.
     */
    uint256 public constant MIN_SUPPLY = 100;
    /**
     * Extra supply to be minted for the higer price
     */
    uint256 public constant EXTRA_SUPPLY = 50;
    /**
     * Supply to be minted by the owner
     */
    uint256 public constant OWNER_SUPPLY = 400;
    /**
     * Maximum to mint per transaction
     */
    uint256 public constant MAX_MINT_PER_TRANSACTION = 10;

    // Duration in seconds of the minting phase
    uint256 private _mintingDuration;
    // Indicator if sale is started and when started
    uint256 private _saleStartedAt = 0;
    // The amount of tokens that already minted
    uint256 private _supplyMinted = 0;
    // The amount of tokens that already minted by the owner
    uint256 private _ownerMinted = 0;
    // Token id counter
    Counters.Counter private _tokenIdCounter;

    constructor(uint256 __mintingDuration) ERC721("MyToken", "MTK") {
      _mintingDuration = __mintingDuration;
    }

    /**
     * Views
     */

    /**
     * Duration in seconds of the minting phase
     */
    function mintingDuration() public view returns (uint256) {
      return _mintingDuration;
    }
    /**
     * Amount of the supply that already been minted by users
     */
    function supplyMinted() public view returns (uint256) {
      return _supplyMinted;
    }
    /**
     * Amount of the supply that already been minted by owner
     */
    function ownerMinted() public view returns (uint256) {
      return _ownerMinted;
    }
    /**
     * Timestamp of the time the sale has started
     */
    function saleStartedAt() public view returns (uint256) {
      return _saleStartedAt;
    }
    /**
     * Boolean indicator, does the sale started?
     */
    function isSaleStarted() public view returns (bool) {
      return saleStartedAt() != 0;
    }
    /**
     * Boolean indicator, does the sale finished?
     */
    function isSaleFinished() public view returns (bool) {
      return isSaleStarted() && block.timestamp > saleStartedAt() + mintingDuration();
    }
    /**
     * Boolean indicator, does the sale active?
     */
    function isSaleActive() public view returns (bool) {
      return isSaleStarted() && block.timestamp <= saleStartedAt() + mintingDuration();
    }
    /**
     * Boolean indicator, does the minimum supply minted?
     */
    function isMinSupplyMinted() public view returns (bool) {
      return supplyMinted() >= MIN_SUPPLY;
    }
    /**
     * Boolean indicator, does the extra supply minted?
     */
    function isExtraSupplyMinted() public view returns (bool) {
      return supplyMinted() >= MIN_SUPPLY + EXTRA_SUPPLY;
    }

    /**
     * Public functions
     */

     /**
      * Allows the owner to start the sale
      */
    function startSale() public onlyOwner {
      require(!isSaleStarted(), "Sale already started");

      _saleStartedAt = block.timestamp;
    }
    /**
     * Allows everyone to mint tokens
     *
     * uint256 [amount] amount of tokens to mint
     */
    function mint(uint256 amount) public payable {
      require(isSaleActive(), "Sale is not active");
      require(amount <= MAX_MINT_PER_TRANSACTION, "You can only mint 10 tokens at a time");
      require(supplyMinted().add(amount) <= MIN_SUPPLY, "Can not mint more than the max supply");
      require(msg.value >= amount * MINT_PRICE, "You have not sent enough ETH");

      _mintMulti(msg.sender, amount);
    }
    /**
     * Allows everyone to mint the extra tokens
     *
     * uint256 [amount] amount of extra tokens to mint
     */
    function mintExtra(uint256 amount) public payable {
      require(isSaleActive(), "Sale is not active");
      require(amount <= MAX_MINT_PER_TRANSACTION, "You can only mint 10 tokens at a time");
      require(supplyMinted().add(amount) <= MIN_SUPPLY + EXTRA_SUPPLY, "Can not mint more than the max supply");
      require(msg.value >= amount * MINT_EXTRA_PRICE, "You have not sent enough ETH");
      require(isMinSupplyMinted(), "The normal supply has not minted yet");

      _mintMulti(msg.sender, amount);
    }
    /**
     * Allows the owner to mint tokens
     *
     * uint256 [amount] amount of tokens to mint
     */
    function mintOwner(uint256 amount) public onlyOwner {
      require(isMinSupplyMinted(), "The owner can not mint before the normal supply is minted");
      require(ownerMinted().add(amount) <= OWNER_SUPPLY, "The owner can not mint more than {OWNER_SUPPLY} tokens");

      for (uint256 i = 0; i < amount; i++) {
         uint256 tokenId = _tokenIdCounter.current();
         _tokenIdCounter.increment();

         _safeMint(msg.sender, tokenId);
         _ownerMinted = _ownerMinted.add(1);
      }
    }
    /**
     * Allows the owner to withdraw the funds
     */
    function withdraw() public onlyOwner {
      require(isMinSupplyMinted(), "Goal has not been reached, cannot withdraw funds");

      uint256 balance = address(this).balance;
      payable(owner()).transfer(balance);
    }
    /**
     * Allows token holders to get a refund if the goal has not reached
     */
    function getRefund() public {
      require(isSaleFinished(), "Sale is still active");
      require(!isMinSupplyMinted(), "Goal has been reached! Cannot refund token fee");

      uint256 tokensAmount = balanceOf(msg.sender);

      require(tokensAmount > 0, "Not a token holder");

      // a list of user token-ids
      uint256[] memory userTokens = new uint256[](tokensAmount);

      // get all token ids own by the user
      for (uint256 index = 0; index < tokensAmount; index++) {
        uint256 tokenId = tokenOfOwnerByIndex(msg.sender, index);
        userTokens[index] = tokenId;
      }

      // pay the user back
      payable(msg.sender).transfer(tokensAmount * MINT_PRICE);

      // burn the user tokens
      for (uint256 index = 0; index < tokensAmount; index++) {
        _burn(userTokens[index]);
      }
    }

    /**
     * Internal functions
     */

    function _mintMulti(address to, uint256 amount) internal {
      for (uint256 i = 0; i < amount; i++) {
         uint256 tokenId = _tokenIdCounter.current();
         _tokenIdCounter.increment();

         _safeMint(to, tokenId);
         _supplyMinted = _supplyMinted.add(1);
      }
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://tokens.my-domain.xyz/";
    }

    /**
     * The following functions are overrides required by Solidity.
     */

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
