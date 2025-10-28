// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FeeManager is Ownable {
    uint256 public platformFeeBps = 50; // 0.5%
    address payable public feeReceiver;

    event FeeReceiverUpdated(address indexed newReceiver);
    event PlatformFeeUpdated(uint256 newBps);

    constructor(address payable _feeReceiver) {
        require(_feeReceiver != address(0), "invalid receiver");
        feeReceiver = _feeReceiver;
    }

    function setPlatformFeeBps(uint256 bps) external onlyOwner {
        require(bps <= 1000, "bps too high");
        platformFeeBps = bps;
        emit PlatformFeeUpdated(bps);
    }

    function setFeeReceiver(address payable r) external onlyOwner {
        require(r != address(0), "zero");
        feeReceiver = r;
        emit FeeReceiverUpdated(r);
    }
}