module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const FlyWithWing = await deploy("FlyWithWing", { from: deployer, args: [], log: true });

  const FlyNoWay = await deploy("FlyNoWay", { from: deployer, args: [], log: true });
  const Quack = await deploy("Quack", { from: deployer, args: [], log: true });
  const Squack = await deploy("Squack", { from: deployer, args: [], log: true });
  const MuteQuack = await deploy("MuteQuack", { from: deployer, args: [], log: true });

  await deploy("Duck", { from: deployer, args: [FlyWithWing.address, Quack.address], log: true });
  await deploy("MallardDuck", { from: deployer, args: [FlyWithWing.address, Quack.address], log: true });
  await deploy("RedheadDuck", { from: deployer, args: [FlyWithWing.address, Quack.address], log: true });
  await deploy("RubberDuck", { from: deployer, args: [FlyWithWing.address, Quack.address], log: true });
  await deploy("DecoyDuck", { from: deployer, args: [FlyWithWing.address, Quack.address], log: true });
};
module.exports.tags = ["Strategy"];
