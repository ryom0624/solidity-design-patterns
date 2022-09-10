module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("WrongMallardDuck", { from: deployer, args: [], log: true });
  await deploy("WrongRedheadDuck", { from: deployer, args: [], log: true });
  await deploy("WrongRubberDuck", { from: deployer, args: [], log: true });
  await deploy("WrongDecoyDuck", { from: deployer, args: [], log: true });
};
module.exports.tags = ["WrongStrategy"];
