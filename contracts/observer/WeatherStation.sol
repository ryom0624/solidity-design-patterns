// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./interfaces/Interfaces.sol";
import "./WeatherDataObserver.sol";
import "./WeatherDataSubject.sol";
import "hardhat/console.sol";

contract WeatherStation {
    WeatherDataSubject weatherDataSubject;
    CurrentConditionDisplay currentConditionsDisplay;
    StatisticsDisplay statisticsDisplay;
    ForecastDisplay forcastDisplay;

    constructor(
        address _weatherDataSubject,
        address _currentConditionsDisplay,
        address _statisticsDisplay,
        address _forcastDisplay
    ) {
        weatherDataSubject = WeatherDataSubject(_weatherDataSubject);
        currentConditionsDisplay = CurrentConditionDisplay(
            _currentConditionsDisplay
        );
        statisticsDisplay = StatisticsDisplay(_statisticsDisplay);
        forcastDisplay = ForecastDisplay(_forcastDisplay);
    }

    function main() public {
        weatherDataSubject.setMeasurements(block.timestamp);

        currentConditionsDisplay.display();
        statisticsDisplay.display();
        forcastDisplay.display();
    }
}
