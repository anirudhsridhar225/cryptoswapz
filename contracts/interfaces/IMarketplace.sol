// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IMarketplace {
    event Listed(
        uint256 indexed listingId,
        address indexed seller,
        address token,
        uint256 tokenAmt,
        uint256 pricePerToken
    );

    event Cancelled(
        uint256 indexed listingId
    );

    event Bought(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 tokenAmt,
        uint256 totalPrice
    );

    function listTokenForSale(
        IERC20 token,
        uint256 tokenAmt,
        uint256 pricePerToken
    ) external returns (uint256 totalPrice);

    function cancelListing(uint256 listingId) external;
    function buyToken(uint256 listingId, uint256 buyAmt) external payable;
}