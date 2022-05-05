import { addSeconds, fromUnixTime } from 'date-fns';

const api = (() => {
  const API_KEY = 'c93fd1817f3fbe42aeac0a63076603b9';
  async function processData(data) {
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], {
      type: 'region',
    });
    const { locationData, forecastData, units } = data;
    const processedData = {
      city: locationData.name,
      country: regionNamesInEnglish.of(locationData.sys.country),
      units,
      current: {
        temp: Math.round(forecastData.current.temp),
        feelsLike: Math.round(forecastData.current.feels_like),
        humidity: forecastData.current.humidity,
        clouds: forecastData.current.clouds,
        uvi: Math.round(forecastData.current.uvi),
        visibility: forecastData.current.visibility / 1000,
        windSpeed: forecastData.current.wind_speed,
        windDegree: forecastData.current.wind_deg,
        tempDescription: forecastData.current.weather[0].description,
        icon: forecastData.current.weather[0].icon,
        chanceOfRain: Math.round(forecastData.daily[0].pop * 100),
        sunriseTime: addSeconds(
          fromUnixTime(forecastData.current.sunrise),
          forecastData.timezone_offset + (new Date().getTimezoneOffset() * 60),
        ),
        sunsetTime: addSeconds(
          fromUnixTime(forecastData.current.sunset),
          forecastData.timezone_offset + (new Date().getTimezoneOffset() * 60),
        ),
        moonPhase: forecastData.daily[0].moon_phase,
        time: addSeconds(
          new Date(),
          forecastData.timezone_offset + (new Date().getTimezoneOffset() * 60),
        ),
      },
      daily: [],
      hourly: [],
    };

    for (let i = 1; i <= 7; i += 1) {
      processedData.daily[i - 1] = {
        date: addSeconds(
          fromUnixTime(forecastData.daily[i].dt),
          forecastData.timezone_offset,
        ),
        icon: forecastData.daily[i].weather[0].icon,
        tempDescription: forecastData.daily[i].weather[0].description,
        dayTemp: Math.round(forecastData.daily[i].temp.day),
        nightTemp: Math.round(forecastData.daily[i].temp.night),
        windDegree: forecastData.daily[i].wind_deg,
        windSpeed: forecastData.daily[i].wind_speed,
      };
    }

    for (let j = 0; j < 24; j += 1) {
      processedData.hourly[j] = {
        date: addSeconds(
          fromUnixTime(forecastData.hourly[j].dt),
          forecastData.timezone_offset,
        ),
        icon: forecastData.hourly[j].weather[0].icon,
        tempDescription: forecastData.hourly[j].weather[0].description,
        temp: forecastData.hourly[j].temp,
        windDegree: forecastData.hourly[j].wind_deg,
        windSpeed: forecastData.hourly[j].wind_speed,
        windGust: forecastData.hourly[j].wind_gust,
      };
    }

    return processedData;
  }

  async function getForecastData(locationData, units) {
    const { coord } = locationData;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=alerts,minutely&units=${units}&appid=${API_KEY}`,
        { mode: 'cors' },
      );
      const forecastData = await response.json();
      return processData({ locationData, forecastData, units });
    } catch (error) {
      return { cod: error.name, message: error.message };
    }
  }

  async function getLocData(query, units = 'metric') {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`,
        { mode: 'cors' },
      );
      const locData = await response.json();

      if (response.status >= 400) {
        return locData;
      }
      return getForecastData(locData, units);
    } catch (error) {
      return { cod: error.name, message: error.message };
    }
  }

  return {
    getLocData,
  };
})();

export default api;
