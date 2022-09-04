// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "./interfaces/Behavior.sol";

contract FlyWithWing is FlyBehavior {
    function fly() external pure returns(string memory) {
        return "I'm flying";
    }
}

contract FlyNoWay is FlyBehavior {
    function fly() external pure returns(string memory) {
        return "no flying";
    }
}

contract Quack is QuackBehavior {
    function quack() external pure returns (string memory) {
        return "quack!!!";
    }
}
contract Squack is QuackBehavior {
        function quack() external pure returns (string memory){
            return "squack!!!";
        }
}

contract MuteQuack is QuackBehavior {
        function quack() external pure returns (string memory) {
            return "mute quack";
        }

}
