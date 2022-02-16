// Current:
// City and country - weatherData.name, weatherData.sys.country
// Temp - weatherData.main.temp
// Temp feels like - weatherData.main.feels_like
// Temp description - weatherData.weather.main, weatherData.weather.description
// Wind speed - weatherData.wind.speed
// Wind speed degree - weatherData.wind.deg
// Chance of rain -
// Humidity - weatherData.main.humidity
// Date and time - new Date()
// Sunrise time - weatherData.sys.sunrise
// Sunset time- weatherData.sys.sunset
//
// Daily (7 days):
// Day temp
// Night temp
// Temp description
// Wind?
//
// Hourly (24 hours):
// Temp
// Temp description
// Chance of rain
// Wind?

const api = (() => {
  async function getCityData(query) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=c93fd1817f3fbe42aeac0a63076603b9`,
      { mode: 'cors' },
    );
    const data = await response.json();
    const { coord } = data;
    const city = data.name;
    const { country } = data.sys;
    return { coord, city, country };
  }

  async function getForecastData(coord, units = 'metric') {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=alerts,minutely&units=${units}&appid=c93fd1817f3fbe42aeac0a63076603b9`,
      { mode: 'cors' },
    );
    const data = await response.json();
    return data;
  }

  async function getData(query) {
    const cityData = await getCityData(query);
    const forecastData = await getForecastData(cityData.coord);
    return { cityData, forecastData };
  }

  return {
    getData,
  };
})();

export default api;
