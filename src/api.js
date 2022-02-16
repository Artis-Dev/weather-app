const api = (() => {
  async function getCityData(query) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=c93fd1817f3fbe42aeac0a63076603b9`,
        { mode: 'cors' },
      );
      const data = await response.json();
      const { coord } = data;
      const city = data.name;
      const { country } = data.sys;
      return { coord, city, country };
    } catch (error) {
      return console.error(error);
    }
  }

  async function getForecastData(coord, units = 'metric') {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=alerts,minutely&units=${units}&appid=c93fd1817f3fbe42aeac0a63076603b9`,
        { mode: 'cors' },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return console.error(error);
    }
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
