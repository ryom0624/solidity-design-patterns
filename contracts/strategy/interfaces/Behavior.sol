// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

interface FlyBehavior {
    function fly() external pure returns (string memory);
}
interface QuackBehavior {
    function quack() external pure returns (string memory);
}
