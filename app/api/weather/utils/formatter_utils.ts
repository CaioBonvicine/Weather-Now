export function formatWeatherData(weatherData: any) {
  const localTimestamp =(weatherData.dt + weatherData.timezone + 10800) * 1000;

  const localDateObj = new Date(localTimestamp);

  const localHour = localDateObj.getHours();
  const isDay = localHour >= 6 && localHour < 18;

  return {
    city: weatherData.name,
    temp: Math.round(weatherData.main.temp),
    condition: weatherData.weather[0].description,
    humidity: weatherData.main.humidity,
    windSpeed: weatherData.wind.speed,
    country: weatherData.sys.country,
    time: localDateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    date: localDateObj.toLocaleDateString("en-US"),
    isDay,
  };
}
