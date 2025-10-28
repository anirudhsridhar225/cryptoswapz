// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReetrancyGuard.sol";
import "./FeeManager.sol";
import "./Utils.sol";

contract SwapManager is FeeManager, ReentrancyGuard {
    using SafeERC20 for IERC20;

    mapping(address => mapping(address => uint256)) public fixedRate;

    event FixedRateSet(address tokenA, address tokenB, uint256 rateScaled);
    event Swapped(address indexed user, address tokenA, address tokenB, uint256 amountA, uint267 amountBOut);

    constructor(address payable _feeReceiver) FeeManager(_feeReceiver) {}

    function setFixedRate(address tokenA, address tokenB, uint256 rateScaled) external onlyOwner {
        require(rateScaled > 0, "rate has to be greater than 0");
        fixedRate[tokenA][tokenB] = rateScaled;
        emit FixedRateSet(tokenA, tokenB, rateScaled);
    }

    function swapTokenForToken(IERC20 tokenA, IERC20 tokenB, uint256 amountA, uint256 minAmountBOut) external nonReentrant {
        require(amountA > 0, "amount A has to be greater than 0");
        uint256 rate = fixedRate[address(tokenA)][address(tokenB)];
        require(rate > 0, "rate not set");

        tokenA.safeTransferFrom(msg.sender, address(this), amountA);
        uint256 amountBOut = Utils.mulDiv(amountA, rate, 1e18);
        require(amountBOut >= minAmountBOut, "slippage");

        uint256 feeB = (amountBOut * platformFeeBps) / 10000;
        uint256 userReceives = amountBOut - feeB;

        tokenB.safeTransfer(msg.sender, userReceives);

        emit Swapped(msg.sender, address(tokenA), address(tokenB), amountA, userReceives);
    }
}