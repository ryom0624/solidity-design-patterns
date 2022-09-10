// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract WrongObserverWeatherData {
    WrongCurrentConditionDisplay public wrongCurrentConditionDisplay;
    WrongStatisticsDisplay       public wrongStatisticsDisplay;
    WrongForecastDisplay         public wrongForecastDisplay;

    uint temp;
    uint humidity;
    uint pressure;

    constructor(
        address _wrongCurrentConditionDisplay,
        address _wrongStatisticsDisplay,
        address _wrongForecastDisplay
    ) {
        wrongCurrentConditionDisplay = WrongCurrentConditionDisplay(_wrongCurrentConditionDisplay);
        wrongStatisticsDisplay = WrongStatisticsDisplay(_wrongStatisticsDisplay);
        wrongForecastDisplay = WrongForecastDisplay(_wrongForecastDisplay);
    }

    function mesurementsChanged(uint _random) public {
        temp = getTemputure(_random);
        humidity = getHumidity(_random);
        pressure = getPressure(_random);

        wrongCurrentConditionDisplay.update(temp, humidity, pressure);
        wrongStatisticsDisplay.update(temp, humidity, pressure);
        wrongForecastDisplay.update(temp, humidity, pressure);
    }

    function getTemputure(uint _random) internal pure returns(uint) {
        return 100 + _random;
    }
    function getHumidity(uint _random) internal pure returns(uint) {
        return 200 + _random;
    }
    function getPressure(uint _random) internal pure returns(uint) {
        return 300 + _random;
    }
}

contract WrongCurrentConditionDisplay {
    uint public temp;
    uint  public humidity;
    uint  public pressure;

    function update(uint _temp, uint _humidity, uint _pressure ) public {
        temp = _temp;
        humidity = _humidity;
        pressure = _pressure;
    }

    function someMethod() public {}
}

contract WrongStatisticsDisplay {
    uint  public temp;
    uint  public humidity;
    uint  public pressure;
    function update(uint _temp, uint _humidity, uint _pressure ) public {
        temp = _temp;
        humidity = _humidity;
        pressure = _pressure;
    }
    function someMethod() public {}
}

contract WrongForecastDisplay {
    uint  public temp;
    uint  public humidity;
    uint  public pressure;
    function update(uint _temp, uint _humidity, uint _pressure ) public {
        temp = _temp;
        humidity = _humidity;
        pressure = _pressure;
    }
    function someMethod() public {}
}
