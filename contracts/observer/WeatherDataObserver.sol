// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./interfaces/Interfaces.sol";
import "./WeatherDataSubject.sol";
import "hardhat/console.sol";

contract CurrentConditionDisplay is IDisplayElements, IObserver, IObserverV2 {
    uint public temp;
    uint public humidity;
    uint public pressure;

    WeatherDataSubject weatherDataSubject;

    constructor(address _weatherDataSubject) {
        weatherDataSubject = WeatherDataSubject(_weatherDataSubject);
        weatherDataSubject.registerObserver(address(this));
    }

    function display() public view {
        console.log(
            string(
                abi.encodePacked(
                    "current temp is: ",
                    temp,
                    " current humidity is ",
                    humidity,
                    " current puressure is ",
                    pressure
                )
            )
        );
    }

    function update(
        uint _temp,
        uint _humidity,
        uint _pressure
    ) public {
        temp = _temp;
        humidity = _humidity;
        pressure = _pressure;
    }

    // pull型
    function updateV2(uint _random) public {
        humidity = weatherDataSubject.getHumidity(_random);
        pressure = weatherDataSubject.getPressure(_random);
    }

    function someMethod() public {}
}

contract StatisticsDisplay is IDisplayElements, IObserver {
    uint public temp;
    uint public humidity;
    uint public pressure;

    WeatherDataSubject weatherDataSubject;

    constructor(address _weatherDataSubject) {
        weatherDataSubject = WeatherDataSubject(_weatherDataSubject);
        weatherDataSubject.registerObserver(address(this));
    }

    function display() public view {
        console.log(
            string(
                abi.encodePacked(
                    "avarate temp is: ",
                    temp,
                    " averate humidity is ",
                    humidity
                )
            )
        );
    }

    function update(
        uint _temp,
        uint _humidity,
        uint _pressure
    ) public {
        temp = _temp;
        humidity = _humidity;
        pressure = _pressure;
    }

    function someMethod() public {}
}

contract ForecastDisplay is IDisplayElements, IObserver {
    uint public lastPressure;
    uint public temp;
    uint public humidity;
    uint public pressure;

    WeatherDataSubject weatherDataSubject;

    constructor(address _weatherDataSubject) {
        weatherDataSubject = WeatherDataSubject(_weatherDataSubject);
        weatherDataSubject.registerObserver(address(this));
    }

    function display() public view {
        if (lastPressure > pressure) {
            console.log("It will get hotter.");
        } else if (lastPressure == pressure) {
            console.log("It will be same.");
        } else {
            console.log("It will get cooler.");
        }
    }

    function update(
        uint _temp,
        uint _humidity,
        uint _pressure
    ) public {
        temp = _temp;
        humidity = _humidity;
        lastPressure = pressure;

        pressure = _pressure;
    }

    function someMethod() public {}
}

contract ThirdpartyDisplay is IDisplayElements, IObserver {
    uint public temp;
    uint public humidity;
    uint public pressure;

    WeatherDataSubject weatherDataSubject;

    constructor(address _weatherDataSubject) {
        weatherDataSubject = WeatherDataSubject(_weatherDataSubject);
        weatherDataSubject.registerObserver(address(this));
    }

    function display() public view {
        console.log(temp + humidity + pressure);
    }

    function update(
        uint _temp,
        uint _humidity,
        uint _pressure
    ) public {
        temp = _temp;
        humidity = _humidity;
        pressure = _pressure;
    }

    function someMethod() public {}
}
