// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ISubject {
    function registerObserver(address) external;

    function removeObserver(address) external;

    function notifyObserver(
        uint,
        uint,
        uint
    ) external;
}

interface IObserver {
    function update(
        uint,
        uint,
        uint
    ) external;
}

interface IObserverV2 {
    function updateV2(uint) external;
}

interface IDisplayElements {
    function display() external;
}
