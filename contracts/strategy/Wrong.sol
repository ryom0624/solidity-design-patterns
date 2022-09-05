// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface WrongFlyable {
    function fly() external pure returns(string memory);
}

interface WrongQuackable {
    function quack() external pure returns(string memory);
}

contract WrongDuck {
    function swim() public {}
    function display() public virtual returns(string memory) {
        return "display";
    }
}

contract WrongMallardDuck is WrongDuck, WrongFlyable, WrongQuackable {
    function display() public pure override returns(string memory) {
        return "WrongMallardDuck!";
    }

    function fly() external pure returns(string memory) {
        return "mallard duck is fly!";
    }
    function quack() external pure returns(string memory) {
        return "mallard duck is quack!";
    }
}

contract WrongRedheadDuck is WrongDuck, WrongFlyable, WrongQuackable {
    function display() public pure override returns(string memory) {
        return "WrongRedheadDuck!";
    }
    function fly() external pure returns(string memory) {
        return "redhat duck is fly!";
    }
    function quack() external pure returns(string memory) {
        return "redhat duck is quack!";
    }
}

contract WrongRubberDuck is WrongDuck, WrongQuackable {
    function display() public pure override returns(string memory) {
        return "WrongRubberDuck!";
    }
    function quack() external pure returns(string memory) {
        return "rubber duck is quack!";
    }
}

contract WrongDecoyDuck is WrongDuck {
    function display() public pure override returns(string memory) {
        return "WrongDecoyDuck!";
    }

}
