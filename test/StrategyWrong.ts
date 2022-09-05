import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { WrongMallardDuck, WrongRedheadDuck, WrongRubberDuck, WrongDecoyDuck } from "../typechain-types";

describe("Duck Strategy Pattern", async () => {
  let signer: SignerWithAddress;
  let wrongMallardDuck: WrongMallardDuck;
  let wrongRedheadDuck: WrongRedheadDuck;
  let wrongRubberDuck: WrongRubberDuck;
  let wrongDecoyDuck: WrongDecoyDuck;

  beforeEach(async () => {
    const { WrongMallardDuck, WrongRedheadDuck, WrongRubberDuck, WrongDecoyDuck } = await deployments.fixture("WrongStrategy");

    wrongMallardDuck = (await ethers.getContractAt("WrongMallardDuck", WrongMallardDuck.address, signer)) as WrongMallardDuck;
    wrongRedheadDuck = (await ethers.getContractAt("WrongRedheadDuck", WrongRedheadDuck.address, signer)) as WrongRedheadDuck;
    wrongRubberDuck = (await ethers.getContractAt("WrongRubberDuck", WrongRubberDuck.address, signer)) as WrongRubberDuck;
    wrongDecoyDuck = (await ethers.getContractAt("WrongDecoyDuck", WrongDecoyDuck.address, signer)) as WrongDecoyDuck;

    signer = (await ethers.getSigners())[0];
  });

  it("display", async () => {
    expect(await wrongMallardDuck.display()).to.be.equal("WrongMallardDuck!");
    expect(await wrongRedheadDuck.display()).to.be.equal("WrongRedheadDuck!");
    expect(await wrongRubberDuck.display()).to.be.equal("WrongRubberDuck!");
    expect(await wrongDecoyDuck.display()).to.be.equal("WrongDecoyDuck!");
  });

  it("fly", async () => {
    expect(await wrongMallardDuck.fly()).to.be.equal("mallard duck is fly!");
    expect(await wrongRedheadDuck.fly()).to.be.equal("redhat duck is fly!");
  });

  it("quack", async () => {
    expect(await wrongMallardDuck.quack()).to.be.equal("mallard duck is quack!");
    expect(await wrongRedheadDuck.quack()).to.be.equal("redhat duck is quack!");
    expect(await wrongRubberDuck.quack()).to.be.equal("rubber duck is quack!");
  });
});
