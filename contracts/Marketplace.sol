// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReetrancyGuard.sol";
import "./FeeManager.sol";
import "./Utils.sol";
import "./interfaces/IMarketplace.sol";

contract MarketPlace is FeeManager, ReentrancyGuard, IMarketplace {
    usign SafeERC20 for IERC20;

    struct Listing {
        address seller;
        IERC20 token;
        uint256 tokenAmt;
        uint256 pricePerToken;
        bool active;
    }

    uint256 private _nextListingId = 1;
    mapping(uint256 => Listing) public listings;

    constructor(address payable _feeReceiver) FeeManager(_feeReceiver) {}

    function listTokenForSale(IERC20 token, uint256 tokenAmount, uint256 pricePerTokenInWei) external nonReentrant returns (uint256) {
        require(tokenAmount > 0 && pricePerTokenInWei > 0, "invalid input");
        token.safeTransferFrom(msg.sender, address(this), tokenAmount);


        uint256 id = _nextListingId++;
        listings[id] = Listing({seller: msg.sender, token: token, tokenAmount: tokenAmount, pricePerTokenInWei: pricePerTokenInWei, active: true});


        emit Listed(id, msg.sender, address(token), tokenAmount, pricePerTokenInWei);
        return id;
    }


    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage l = listings[listingId];
        require(l.active, "inactive");
        require(l.seller == msg.sender || owner() == msg.sender, "unauthorized");


        l.active = false;
        l.token.safeTransfer(l.seller, l.tokenAmount);


        emit Cancelled(listingId);
    }


    function buy(uint256 listingId, uint256 buyAmount) external payable nonReentrant {
        Listing storage l = listings[listingId];
        require(l.active && buyAmount > 0 && buyAmount <= l.tokenAmount, "invalid");


        uint256 totalPrice = Utils.mulDiv(buyAmount, l.pricePerTokenInWei, 1);
        require(msg.value == totalPrice, "wrong ETH");


        uint256 fee = (totalPrice * platformFeeBps) / 10000;
        uint256 sellerProceeds = totalPrice - fee;


        l.tokenAmount -= buyAmount;
        if (l.tokenAmount == 0) l.active = false;


        l.token.safeTransfer(msg.sender, buyAmount);


        (bool sentFee,) = feeReceiver.call{value: fee}("");
        require(sentFee, "fee fail");
        (bool sentSeller,) = payable(l.seller).call{value: sellerProceeds}("");
        require(sentSeller, "seller fail");


        emit Bought(listingId, msg.sender, buyAmount, totalPrice);
    }


    receive() external payable {}
}