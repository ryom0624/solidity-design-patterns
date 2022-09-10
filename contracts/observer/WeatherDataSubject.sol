// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./interfaces/Interfaces.sol";
import "hardhat/console.sol";

contract WeatherDataSubject is ISubject {
    uint256 temp;
    uint256 humidity;
    uint256 pressure;

    constructor(address[] memory _observers) {
        for (uint256 i = 0; i < _observers.length; i++) {
            registerObserver(_observers[i]);
        }
    }

    struct ObserverManager {
        IObserver observer;
        bool exists;
    }
    mapping(address => ObserverManager) observers;
    address[] observerList;

    function registerObserver(address _observer) public {
        require(!observers[_observer].exists, "already registerd");

        observerList.push(_observer);
        observers[_observer] = ObserverManager(IObserver(_observer), true);
    }

    function removeObserver(address _observer) public {
        require(!observers[_observer].exists, "not registerd");

        for (uint256 i = 0; i < observerList.length; i++) {
            if (observerList[i] == _observer) {
                delete observerList[i];
            }
        }
        delete observers[_observer];
    }

    function notifyObserver(
        uint _temp,
        uint _humidity,
        uint _pressure
    ) public {
        for (uint256 i = 0; i < observerList.length; i++) {
            observers[observerList[i]].observer.update(
                _temp,
                _humidity,
                _pressure
            );

            // observers[observerList[i]].observerV2.updateV2(
            //     _random,
            // );
        }
    }

    function mesurementsChanged() public {
        notifyObserver(temp, humidity, pressure);
    }

    function setMeasurements(uint256 _random) public {
        temp = getTemputure(_random);
        humidity = getHumidity(_random);
        pressure = getPressure(_random);
        mesurementsChanged();
    }

    function getTemputure(uint256 _random) public pure returns (uint256) {
        return 100 + _random;
    }

    function getHumidity(uint256 _random) public pure returns (uint256) {
        return 200 + _random;
    }

    function getPressure(uint256 _random) public pure returns (uint256) {
        return 300 + _random;
    }
}
