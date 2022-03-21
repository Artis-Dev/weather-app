import { format, addSeconds, fromUnixTime } from 'date-fns';

const api = (() => {
  async function processData(data) {
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
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
        windSpeed: Math.round(forecastData.current.wind_speed),
        windDegree: forecastData.current.wind_deg,
        tempDescription: forecastData.current.weather[0].description,
        icon: forecastData.current.weather[0].icon,
        chanceOfRain: Math.round(forecastData.daily[0].pop * 100),
        sunriseTime: format(addSeconds(fromUnixTime(forecastData.current.sunrise), forecastData.timezone_offset), 'HH:mm'),
        sunsetTime: format(addSeconds(fromUnixTime(forecastData.current.sunset), forecastData.timezone_offset), 'HH:mm'),
        moonPhase: forecastData.daily[0].moon_phase,
        time: format(addSeconds(new Date(), forecastData.timezone_offset), 'EEE, MMMM d | HH:mm'),
      },
      daily: [],
      hourly: [],
    };

    for (let i = 0; i < 7; i += 1) {
      processedData.daily[i] = {
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
      processedData.hourly[j] = {
        temp: forecastData.hourly[j].temp,
        weatherId: forecastData.hourly[j].weather[0].id,
        tempDescription: forecastData.hourly[j].weather[0].description,
        windSpeed: forecastData.hourly[j].wind_speed,
        windGust: forecastData.hourly[j].wind_gust,
        windDegree: forecastData.hourly[j].wind_deg,
      };
    }

    return processedData;
  }

  async function getForecastData(locationData, units) {
    const { coord } = locationData;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=alerts,minutely&units=${units}&appid=c93fd1817f3fbe42aeac0a63076603b9`,
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
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=c93fd1817f3fbe42aeac0a63076603b9`,
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
