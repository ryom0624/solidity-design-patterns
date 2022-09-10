import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  WrongObserverWeatherData,
  WrongCurrentConditionDisplay,
  WrongStatisticsDisplay,
  WrongForecastDisplay,
} from "../typechain-types";

describe("Duck Strategy Pattern", async () => {
  let signer: SignerWithAddress;
  let wrongObserverWeatherData: WrongObserverWeatherData;
  let wrongCurrentConditionDisplay: WrongCurrentConditionDisplay;
  let wrongStatisticsDisplay: WrongStatisticsDisplay;
  let wrongForecastDisplay: WrongForecastDisplay;

  beforeEach(async () => {
    const { WrongObserverWeatherData, WrongStatisticsDisplay, WrongCurrentConditionDisplay, WrongForecastDisplay } =
      await deployments.fixture("WrongObserverWeatherData");

    wrongObserverWeatherData = (await ethers.getContractAt(
      "WrongObserverWeatherData",
      WrongObserverWeatherData.address,
      signer
    )) as WrongObserverWeatherData;
    wrongCurrentConditionDisplay = (await ethers.getContractAt(
      "WrongCurrentConditionDisplay",
      WrongCurrentConditionDisplay.address,
      signer
    )) as WrongCurrentConditionDisplay;
    wrongStatisticsDisplay = (await ethers.getContractAt(
      "WrongStatisticsDisplay",
      WrongStatisticsDisplay.address,
      signer
    )) as WrongStatisticsDisplay;
    wrongForecastDisplay = (await ethers.getContractAt(
      "WrongForecastDisplay",
      WrongForecastDisplay.address,
      signer
    )) as WrongForecastDisplay;

    signer = (await ethers.getSigners())[0];

    expect(await wrongStatisticsDisplay.temp()).to.be.equal(0);
    expect(await wrongStatisticsDisplay.humidity()).to.be.equal(0);
    expect(await wrongStatisticsDisplay.pressure()).to.be.equal(0);

    expect(await wrongForecastDisplay.temp()).to.be.equal(0);
    expect(await wrongForecastDisplay.humidity()).to.be.equal(0);
    expect(await wrongForecastDisplay.pressure()).to.be.equal(0);

    expect(await wrongCurrentConditionDisplay.temp()).to.be.equal(0);
    expect(await wrongCurrentConditionDisplay.humidity()).to.be.equal(0);
    expect(await wrongCurrentConditionDisplay.pressure()).to.be.equal(0);
  });

  it("1st", async () => {
    const randomParam = 1;
    await wrongObserverWeatherData.mesurementsChanged(randomParam);

    expect(await wrongStatisticsDisplay.temp()).to.be.equal(100 + randomParam);
    expect(await wrongStatisticsDisplay.humidity()).to.be.equal(200 + randomParam);
    expect(await wrongStatisticsDisplay.pressure()).to.be.equal(300 + randomParam);

    expect(await wrongForecastDisplay.temp()).to.be.equal(100 + randomParam);
    expect(await wrongForecastDisplay.humidity()).to.be.equal(200 + randomParam);
    expect(await wrongForecastDisplay.pressure()).to.be.equal(300 + randomParam);

    expect(await wrongCurrentConditionDisplay.temp()).to.be.equal(100 + randomParam);
    expect(await wrongCurrentConditionDisplay.humidity()).to.be.equal(200 + randomParam);
    expect(await wrongCurrentConditionDisplay.pressure()).to.be.equal(300 + randomParam);
  });

  it("2nd", async () => {
    const randomParam = 100;
    await wrongObserverWeatherData.mesurementsChanged(randomParam);

    expect(await wrongStatisticsDisplay.temp()).to.be.equal(100 + randomParam);
    expect(await wrongStatisticsDisplay.humidity()).to.be.equal(200 + randomParam);
    expect(await wrongStatisticsDisplay.pressure()).to.be.equal(300 + randomParam);

    expect(await wrongForecastDisplay.temp()).to.be.equal(100 + randomParam);
    expect(await wrongForecastDisplay.humidity()).to.be.equal(200 + randomParam);
    expect(await wrongForecastDisplay.pressure()).to.be.equal(300 + randomParam);

    expect(await wrongCurrentConditionDisplay.temp()).to.be.equal(100 + randomParam);
    expect(await wrongCurrentConditionDisplay.humidity()).to.be.equal(200 + randomParam);
    expect(await wrongCurrentConditionDisplay.pressure()).to.be.equal(300 + randomParam);
  });
});
