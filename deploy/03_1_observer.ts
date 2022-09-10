module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const weatherDatasubject = await deploy("WeatherDataSubject", {
    from: deployer,
    args: [[]],
    log: true,
  });

  const currentConditionDisplay = await deploy("CurrentConditionDisplay", {
    from: deployer,
    args: [weatherDatasubject.address],
    log: true,
  });
  const statisticsDisplay = await deploy("StatisticsDisplay", { from: deployer, args: [weatherDatasubject.address], log: true });
  const forecastDisplay = await deploy("ForecastDisplay", { from: deployer, args: [weatherDatasubject.address], log: true });

  await deploy("WeatherStation", {
    from: deployer,
    args: [weatherDatasubject.address, currentConditionDisplay.address, statisticsDisplay.address, forecastDisplay.address],
    log: true,
  });
};
module.exports.tags = ["ObserverWeatherData"];
