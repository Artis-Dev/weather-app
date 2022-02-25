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
    const data = {
      city: cityData.city,
      country: cityData.country,
      coord: cityData.coord,
      current: {
        temp: forecastData.current.temp,
        feelsLike: forecastData.current.feels_like,
        weatherId: forecastData.current.weather[0].id,
        tempDescription: forecastData.current.weather[0].description,
        windSpeed: forecastData.current.wind_speed,
        windDegree: forecastData.current.wind_deg,
        chanceOfRain: forecastData.daily[0].pop,
        humidity: forecastData.current.humidity,
        dateAndTime: new Date(),
        sunriseTime: forecastData.current.sunrise,
        sunsetTime: forecastData.current.sunset,
      },
      daily: [],
      hourly: [],
    };

    for (let i = 0; i < 7; i += 1) {
      data.daily[i] = {
        dayTemp: forecastData.daily[i].temp.day,
        nightTemp: forecastData.daily[i].temp.night,
        weatherId: forecastData.daily[i].weather[0].id,
        tempDescription: forecastData.daily[i].weather[0].description,
        windSpeed: forecastData.daily[i].wind_speed,
        windGust: forecastData.daily[i].wind_gust,
        windDegree: forecastData.daily[i].wind_deg,
      };
    }

    for (let j = 0; j < 24; j += 1) {
      data.hourly[j] = {
        temp: forecastData.hourly[j].temp,
        weatherId: forecastData.hourly[j].weather[0].id,
        tempDescription: forecastData.hourly[j].weather[0].description,
        windSpeed: forecastData.hourly[j].wind_speed,
        windGust: forecastData.hourly[j].wind_gust,
        windDegree: forecastData.hourly[j].wind_deg,
      };
    }

    return data;
  }

  return {
    getData,
  };
})();

export default api;
