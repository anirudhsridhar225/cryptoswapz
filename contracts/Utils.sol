// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Utils {
    function mulDiv(uint256 a, uint256 b, uint256 denom) internal pure returns (uint256) {
        return (a * b) / denom;
    }
}