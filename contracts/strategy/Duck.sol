// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "./interfaces/Behavior.sol";

contract Duck {

    address flyBehavior;
    address quackBehavior;

    constructor(address _flyBehavior, address _quackBehavior) {
        flyBehavior = _flyBehavior;
        quackBehavior = _quackBehavior;
    }

    function swim() public {}
    function display() public virtual returns(string memory) {
        return "display";
    }
    function performFly() public view returns(string memory) {
        string memory result = FlyBehavior(flyBehavior).fly();
        // console.log(result);
        return result;
    }
    function performQuack() public view returns(string memory) {
        string memory result = QuackBehavior(quackBehavior).quack();
        // console.log(result);
        return result;
    }
    function setFlyBehavior(address _flyBehavior) public {
        flyBehavior = _flyBehavior;
    }

    function setQuackBehavior(address _quackBehavior) public {
        quackBehavior = _quackBehavior;
    }

}

contract MallardDuck is Duck {
    constructor(address _flyBehavior, address _quackBehavior) Duck(_flyBehavior, _quackBehavior) {}
    function display() public override pure returns(string memory) {
        return "MallardDuck!";
    }
}

contract RedheadDuck is Duck {
    constructor(address _flyBehavior, address _quackBehavior) Duck(_flyBehavior, _quackBehavior) {}
    function display() public override pure returns(string memory) {
        return "RedheadDuck!";
    }
}

contract RubberDuck is Duck {
    constructor(address _flyBehavior, address _quackBehavior) Duck(_flyBehavior, _quackBehavior) {}
    function display() public override pure returns(string memory) {
        return "RubberDuck!";
    }
}

contract DecoyDuck is Duck {
    constructor(address _flyBehavior, address _quackBehavior) Duck(_flyBehavior, _quackBehavior) {}
    function display() public override pure returns(string memory) {
        return "DecoyDuck!";
    }
}
