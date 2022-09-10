import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  WeatherDataSubject,
  CurrentConditionDisplay,
  StatisticsDisplay,
  ForecastDisplay,
  WeatherStation,
} from "../typechain-types";

describe("Duck Strategy Pattern", async () => {
  let signer: SignerWithAddress;
  let weatherDataSubject: WeatherDataSubject;
  let currentConditionDisplay: CurrentConditionDisplay;
  let statisticsDisplay: StatisticsDisplay;
  let forecastDisplay: ForecastDisplay;
  let weatherStation: WeatherStation;

  beforeEach(async () => {
    const { WeatherDataSubject, StatisticsDisplay, CurrentConditionDisplay, ForecastDisplay, WeatherStation } =
      await deployments.fixture("WeatherDataSubject");

    weatherDataSubject = (await ethers.getContractAt(
      "WeatherDataSubject",
      WeatherDataSubject.address,
      signer
    )) as WeatherDataSubject;
    currentConditionDisplay = (await ethers.getContractAt(
      "CurrentConditionDisplay",
      CurrentConditionDisplay.address,
      signer
    )) as CurrentConditionDisplay;
    statisticsDisplay = (await ethers.getContractAt("StatisticsDisplay", StatisticsDisplay.address, signer)) as StatisticsDisplay;
    forecastDisplay = (await ethers.getContractAt("ForecastDisplay", ForecastDisplay.address, signer)) as ForecastDisplay;

    weatherStation = (await ethers.getContractAt("WeatherStation", WeatherStation.address, signer)) as WeatherStation;

    signer = (await ethers.getSigners())[0];
  });

  it("1st", async () => {
    const randomParam = 1;
    await weatherDataSubject.setMeasurements(randomParam);

    expect(await statisticsDisplay.temp()).to.be.equal(100 + randomParam);
    expect(await statisticsDisplay.humidity()).to.be.equal(200 + randomParam);
    expect(await statisticsDisplay.pressure()).to.be.equal(300 + randomParam);

    expect(await forecastDisplay.temp()).to.be.equal(100 + randomParam);
    expect(await forecastDisplay.humidity()).to.be.equal(200 + randomParam);
    expect(await forecastDisplay.pressure()).to.be.equal(300 + randomParam);

    expect(await currentConditionDisplay.temp()).to.be.equal(100 + randomParam);
    expect(await currentConditionDisplay.humidity()).to.be.equal(200 + randomParam);
    expect(await currentConditionDisplay.pressure()).to.be.equal(300 + randomParam);
  });

  it("2nd", async () => {
    const randomParam = 100;
    await weatherDataSubject.setMeasurements(randomParam);

    expect(await statisticsDisplay.temp()).to.be.equal(100 + randomParam);
    expect(await statisticsDisplay.humidity()).to.be.equal(200 + randomParam);
    expect(await statisticsDisplay.pressure()).to.be.equal(300 + randomParam);

    expect(await forecastDisplay.temp()).to.be.equal(100 + randomParam);
    expect(await forecastDisplay.humidity()).to.be.equal(200 + randomParam);
    expect(await forecastDisplay.pressure()).to.be.equal(300 + randomParam);

    expect(await currentConditionDisplay.temp()).to.be.equal(100 + randomParam);
    expect(await currentConditionDisplay.humidity()).to.be.equal(200 + randomParam);
    expect(await currentConditionDisplay.pressure()).to.be.equal(300 + randomParam);
  });

  it("remove an observer and register", async () => {
    const randomParam1 = 100;
    await weatherDataSubject.setMeasurements(randomParam1);

    expect(await statisticsDisplay.temp()).to.be.equal(100 + randomParam1);
    expect(await statisticsDisplay.humidity()).to.be.equal(200 + randomParam1);
    expect(await statisticsDisplay.pressure()).to.be.equal(300 + randomParam1);

    expect(await forecastDisplay.temp()).to.be.equal(100 + randomParam1);
    expect(await forecastDisplay.humidity()).to.be.equal(200 + randomParam1);
    expect(await forecastDisplay.pressure()).to.be.equal(300 + randomParam1);

    expect(await currentConditionDisplay.temp()).to.be.equal(100 + randomParam1);
    expect(await currentConditionDisplay.humidity()).to.be.equal(200 + randomParam1);
    expect(await currentConditionDisplay.pressure()).to.be.equal(300 + randomParam1);

    weatherDataSubject.removeObserver(statisticsDisplay.address);

    const randomParam2 = 100;
    await weatherDataSubject.setMeasurements(randomParam2);

    expect(await statisticsDisplay.temp()).to.be.equal(100 + randomParam1);
    expect(await statisticsDisplay.humidity()).to.be.equal(200 + randomParam1);
    expect(await statisticsDisplay.pressure()).to.be.equal(300 + randomParam1);

    expect(await forecastDisplay.temp()).to.be.equal(100 + randomParam2);
    expect(await forecastDisplay.humidity()).to.be.equal(200 + randomParam2);
    expect(await forecastDisplay.pressure()).to.be.equal(300 + randomParam2);

    expect(await currentConditionDisplay.temp()).to.be.equal(100 + randomParam2);
    expect(await currentConditionDisplay.humidity()).to.be.equal(200 + randomParam2);
    expect(await currentConditionDisplay.pressure()).to.be.equal(300 + randomParam2);

    weatherDataSubject.registerObserver(statisticsDisplay.address);

    await weatherDataSubject.setMeasurements(randomParam2);

    expect(await statisticsDisplay.temp()).to.be.equal(100 + randomParam2);
    expect(await statisticsDisplay.humidity()).to.be.equal(200 + randomParam2);
    expect(await statisticsDisplay.pressure()).to.be.equal(300 + randomParam2);

    await forecastDisplay.display();
    await statisticsDisplay.display();
    await currentConditionDisplay.display();
  });

  it("weather station", async () => {
    weatherStation.main();
  });

  it("pull data", async () => {
    const randomParam = 5;
    await currentConditionDisplay.updateV2(randomParam);
    expect(await currentConditionDisplay.pressure()).to.be.equal(300 + randomParam);
  });
});
