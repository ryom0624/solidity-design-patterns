import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  FlyWithWing,
  FlyNoWay,
  FlyRocketPowered,
  Quack,
  Squack,
  MuteQuack,
  Duck,
  MallardDuck,
  RedheadDuck,
  RubberDuck,
  DecoyDuck,
} from "../typechain-types";

describe("Duck Strategy Pattern", async () => {
  let signer: SignerWithAddress;

  let flyWithWing: FlyWithWing;
  let flyNoWay: FlyNoWay;
  let flyRocketPowered: FlyRocketPowered;
  let quack: Quack;
  let squack: Squack;
  let muteQuack: MuteQuack;
  let duck: Duck;
  let mallardDuck: MallardDuck;
  let redheadDuck: RedheadDuck;
  let rubberDuck: RubberDuck;
  let decoyDuck: DecoyDuck;

  beforeEach(async () => {
    const { FlyWithWing } = await deployments.fixture(["FlyWithWing"]);
    const { FlyNoWay } = await deployments.fixture(["FlyNoWay"]);
    const { FlyRocketPowered } = await deployments.fixture(["FlyRocketPowered"]); // add impl
    const { Quack } = await deployments.fixture(["Quack"]);
    const { Squack } = await deployments.fixture(["Squack"]);
    const { MuteQuack } = await deployments.fixture(["MuteQuack"]);
    const { Duck } = await deployments.fixture(["Duck"]);
    const { MallardDuck } = await deployments.fixture(["MallardDuck"]);
    const { RedheadDuck } = await deployments.fixture(["RedheadDuck"]);
    const { RubberDuck } = await deployments.fixture(["RubberDuck"]);
    const { DecoyDuck } = await deployments.fixture(["DecoyDuck"]);

    flyWithWing = (await ethers.getContractAt("FlyWithWing", FlyWithWing.address, signer)) as FlyWithWing;
    flyNoWay = (await ethers.getContractAt("FlyNoWay", FlyNoWay.address, signer)) as FlyNoWay;
    flyRocketPowered = (await ethers.getContractAt(
      "FlyRocketPowered",
      FlyRocketPowered.address,
      signer
    )) as FlyRocketPowered;
    quack = (await ethers.getContractAt("Quack", Quack.address, signer)) as Quack;
    squack = (await ethers.getContractAt("Squack", Squack.address, signer)) as Squack;
    muteQuack = (await ethers.getContractAt("MuteQuack", MuteQuack.address, signer)) as MuteQuack;
    duck = (await ethers.getContractAt("Duck", Duck.address, signer)) as Duck;
    mallardDuck = (await ethers.getContractAt("MallardDuck", MallardDuck.address, signer)) as MallardDuck;
    redheadDuck = (await ethers.getContractAt("RedheadDuck", RedheadDuck.address, signer)) as RedheadDuck;
    rubberDuck = (await ethers.getContractAt("RubberDuck", RubberDuck.address, signer)) as RubberDuck;
    decoyDuck = (await ethers.getContractAt("DecoyDuck", DecoyDuck.address, signer)) as DecoyDuck;

    signer = (await ethers.getSigners())[0];
  });

  it("display", async () => {
    expect(await mallardDuck.display()).to.be.equal("MallardDuck!");
    expect(await redheadDuck.display()).to.be.equal("RedheadDuck!");
    expect(await rubberDuck.display()).to.be.equal("RubberDuck!");
    expect(await decoyDuck.display()).to.be.equal("DecoyDuck!");
  });

  it("performFly", async () => {
    expect(await mallardDuck.performFly()).to.be.equal("I'm flying");
    expect(await redheadDuck.performFly()).to.be.equal("I'm flying");
    expect(await rubberDuck.performFly()).to.be.equal("I'm flying");
    expect(await decoyDuck.performFly()).to.be.equal("I'm flying");
  });

  it("performQuack", async () => {
    expect(await mallardDuck.performQuack()).to.be.equal("quack!!!");
    expect(await redheadDuck.performQuack()).to.be.equal("quack!!!");
    expect(await rubberDuck.performQuack()).to.be.equal("quack!!!");
    expect(await decoyDuck.performQuack()).to.be.equal("quack!!!");
  });

  it("change strategy", async () => {
    await rubberDuck.setFlyBehavior(flyNoWay.address);
    await rubberDuck.setQuackBehavior(squack.address);

    await decoyDuck.setFlyBehavior(flyNoWay.address);
    await decoyDuck.setQuackBehavior(muteQuack.address);

    expect(await rubberDuck.performFly()).to.be.equal("no flying");
    expect(await decoyDuck.performFly()).to.be.equal("no flying");

    expect(await rubberDuck.performQuack()).to.be.equal("squack!!!");
    expect(await decoyDuck.performQuack()).to.be.equal("mute quack");
  });

  it("rubber duck flies by rocket", async () => {
    await rubberDuck.setFlyBehavior(flyRocketPowered.address);
    expect(await rubberDuck.performFly()).to.be.equal("Flying by Rocket!!");
  });
});
