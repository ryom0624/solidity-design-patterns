module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const currentConditionDisplay = await deploy("WrongCurrentConditionDisplay", { from: deployer, args: [], log: true });
  const statisticsDisplay = await deploy("WrongStatisticsDisplay", { from: deployer, args: [], log: true });
  const forecastDisplay = await deploy("WrongForecastDisplay", { from: deployer, args: [], log: true });

  await deploy("WrongObserverWeatherData", {
    from: deployer,
    args: [statisticsDisplay.address, currentConditionDisplay.address, forecastDisplay.address],
    log: true,
  });
};
module.exports.tags = ["WrongObserverWeatherData"];
