/* eslint no-param-reassign: ["error", { "props": false }] */
import { format } from 'date-fns';

const dom = (() => {
  const mainContainer = document.querySelector('.main-container');

  function loading(state) {
    const loadingSpinner = document.querySelector('.loading');

    if (state === 'loading') {
      loadingSpinner.className = 'loading show';
      mainContainer.className = 'main-container hide';
    } else {
      loadingSpinner.className = 'loading hide';
    }
  }

  function convertIcon(iconId) {
    switch (iconId) {
      case '01d':
        return 'fa-sun';
      case '01n':
        return 'fa-moon-stars';
      case '02d':
        return 'fa-cloud-sun';
      case '02n':
        return 'fa-cloud-moon';
      case '03d':
        return 'fa-clouds-sun';
      case '03n':
        return 'fa-clouds-moon';
      case '04d':
      case '04n':
        return 'fa-clouds';
      case '09d':
      case '09n':
        return 'fa-cloud-showers-heavy';
      case '10d':
        return 'fa-cloud-sun-rain';
      case '10n':
        return 'fa-cloud-moon-rain';
      case '11d':
      case '11n':
        return 'fa-thunderstorm';
      case '13d':
      case '13n':
        return 'fa-cloud-snow';
      case '50d':
      case '50n':
        return 'fa-fog';
      default:
    }
    return false;
  }

  function getUviColor(uvi) {
    let uviColor = '';
    if (uvi <= 2) {
      uviColor = 'data-uvi uvi-green';
    } else if (uvi <= 5) {
      uviColor = 'data-uvi uvi-yellow';
    } else if (uvi <= 7) {
      uviColor = 'data-uvi uvi-orange';
    } else if (uvi > 7) {
      uviColor = 'data-uvi uvi-red';
    }
    return uviColor;
  }

  function getWind(windSpeed, units) {
    const roundedSpeed = Math.round(windSpeed);
    let windDesc;
    let speed = windSpeed;
    if (units === 'imperial') {
      speed *= 0.44704;
    }
    if (windSpeed < 0.5) {
      windDesc = 'Calm';
    } else if (speed < 1.6) {
      windDesc = 'Light air';
    } else if (speed < 3.4) {
      windDesc = 'Light breeze';
    } else if (speed < 5.6) {
      windDesc = 'Gentle breeze';
    } else if (speed < 8) {
      windDesc = 'Moderate breeze';
    } else if (speed < 10.8) {
      windDesc = 'Fresh breeze';
    } else if (speed < 13.9) {
      windDesc = 'Strong breeze';
    } else if (speed < 17.2) {
      windDesc = 'High wind';
    } else if (speed < 20.8) {
      windDesc = 'Gale';
    } else if (speed < 24.5) {
      windDesc = 'Strong gale';
    } else if (speed < 28.5) {
      windDesc = 'Storm';
    } else if (speed < 32.7) {
      windDesc = 'Violent storm';
    } else if (speed >= 32.7) {
      windDesc = 'Hurricane';
    }
    return { windDesc, roundedSpeed };
  }

  function getMoon(moonPhase) {
    let moonIcon = '';
    let moonName = '';

    if (moonPhase === 0 || moonPhase === 1) {
      moonName = 'New Moon';
      moonIcon = './assets/svg/moon-new.svg';
    }
    if (moonPhase === 0.25) {
      moonName = 'First Quarter Moon';
      moonIcon = './assets/svg/moon-first-quarter.svg';
    }
    if (moonPhase === 0.5) {
      moonName = 'Full Moon';
      moonIcon = './assets/svg/moon-full.svg';
    }
    if (moonPhase === 0.75) {
      moonName = 'Last Quarter Moon';
      moonIcon = './assets/svg/moon-last-quarter.svg';
    }
    if (moonPhase > 0 && moonPhase < 0.25) {
      moonName = 'Waxing Crescent';
      moonIcon = './assets/svg/moon-waxing-crescent.svg';
    }
    if (moonPhase > 0.25 && moonPhase < 0.5) {
      moonName = 'Waxing Gibbous';
      moonIcon = './assets/svg/moon-waxing-gibbous.svg';
    }
    if (moonPhase > 0.5 && moonPhase < 0.75) {
      moonName = 'Waning Gibbous';
      moonIcon = './assets/svg/moon-waning-gibbous.svg';
    }
    if (moonPhase > 0.75 && moonPhase < 1) {
      moonName = 'Waning Crescent';
      moonIcon = './assets/svg/moon-waning-crescent.svg';
    }
    return { moonName, moonIcon };
  }

  function changeUnits(units) {
    const metricButton = document.querySelector('.settings-metric');
    const imperialButton = document.querySelector('.settings-imperial');
    const tempUnits = document.querySelectorAll('.unit-temp');
    const speedUnits = document.querySelectorAll('.unit-speed');

    let tempUnit;
    let windUnit;

    if (units === 'metric') {
      metricButton.className = 'settings-metric active';
      imperialButton.className = 'settings-imperial';
      tempUnit = '°C';
      windUnit = 'm/s';
    } else {
      imperialButton.className = 'settings-imperial active';
      metricButton.className = 'settings-metric';
      tempUnit = '°F';
      windUnit = 'mph';
    }

    tempUnits.forEach((unit) => {
      unit.textContent = tempUnit;
    });
    speedUnits.forEach((unit) => {
      unit.textContent = windUnit;
    });
  }

  function formatTime(data, units) {
    let formattedTime;
    let formattedSunriseTime;
    let formattedSunsetTime;
    let formattedWeekDay;
    if (units === 'imperial') {
      formattedTime = format(data, 'EEEE d MMMM yyyy | h:mm aa');
      formattedSunriseTime = format(data, 'hh:mm aa');
      formattedSunsetTime = format(data, 'hh:mm aa');
      formattedWeekDay = format(data, 'EEEE');
      return {
        formattedTime,
        formattedSunriseTime,
        formattedSunsetTime,
        formattedWeekDay,
      };
    }
    formattedTime = format(data, 'EEEE d MMMM yyyy | H:mm');
    formattedSunriseTime = format(data, 'HH:mm');
    formattedSunsetTime = format(data, 'HH:mm');
    formattedWeekDay = format(data, 'EEEE');
    return {
      formattedTime,
      formattedSunriseTime,
      formattedSunsetTime,
      formattedWeekDay,
    };
  }

  function renderWeeklyForecast(daily, units) {
    const dailyList = document.querySelector('.daily-list');

    dailyList.textContent = '';

    for (let i = 0; i < daily.length; i += 1) {
      const dailyItem = document.createElement('div');
      dailyItem.className = 'daily-item';
      const dailyDate = document.createElement('span');
      dailyDate.className = 'data-daily-date daily-item-date';
      dailyDate.textContent = formatTime(
        daily[i].date,
        units,
      ).formattedWeekDay;
      const dailyWeatherDay = document.createElement('span');
      dailyWeatherDay.className = 'daily-item-day-temp';
      dailyWeatherDay.setAttribute(
        'title',
        daily[i].tempDescription.charAt(0).toUpperCase()
          + daily[i].tempDescription.slice(1),
      );
      const dailyWeatherIcon = document.createElement('i');
      dailyWeatherIcon.className = `icon-daily-weather far fa-fw ${convertIcon(
        daily[i].icon,
      )}`;
      const dailyWeatherDayTemp = document.createElement('span');
      dailyWeatherDayTemp.className = 'data-daily-temp';
      dailyWeatherDayTemp.textContent = daily[i].dayTemp;
      const dailyWeatherDayTempUnit = document.createElement('span');
      dailyWeatherDayTempUnit.className = 'unit-temp';
      const dailyWeatherNight = document.createElement('span');
      dailyWeatherNight.className = 'daily-item-night-temp';
      const dailyWeatherNightTemp = document.createElement('span');
      dailyWeatherNightTemp.className = 'data-daily-night-temp';
      dailyWeatherNightTemp.textContent = daily[i].nightTemp;
      const dailyWeatherNightTempUnit = document.createElement('span');
      dailyWeatherNightTempUnit.className = 'unit-temp';

      const dailyWind = document.createElement('span');
      dailyWind.className = 'daily-item-wind';
      dailyWind.setAttribute(
        'title',
        getWind(daily[i].windSpeed, units).windDesc,
      );
      const dailyWindIcon = document.createElement('i');
      dailyWindIcon.className = 'icon-wind-degree far fa-long-arrow-down';
      dailyWindIcon.setAttribute(
        'data-fa-transform',
        `rotate-${daily[i].windDegree}`,
      );
      const dailyWindSpeed = document.createElement('span');
      dailyWindSpeed.className = 'data-daily-wind-speed';
      dailyWindSpeed.textContent = getWind(
        daily[i].windSpeed,
        units,
      ).roundedSpeed;
      const dailyWindSpeedUnit = document.createElement('span');
      dailyWindSpeedUnit.className = 'unit-speed';

      dailyList.appendChild(dailyItem);
      dailyItem.appendChild(dailyDate);
      dailyItem.appendChild(dailyWeatherDay);
      dailyWeatherDay.appendChild(dailyWeatherIcon);
      dailyWeatherDay.appendChild(dailyWeatherDayTemp);
      dailyWeatherDay.appendChild(dailyWeatherDayTempUnit);
      dailyItem.appendChild(dailyWeatherNight);
      dailyWeatherNight.appendChild(dailyWeatherNightTemp);
      dailyWeatherNight.appendChild(dailyWeatherNightTempUnit);
      dailyItem.appendChild(dailyWind);
      dailyWind.appendChild(dailyWindIcon);
      dailyWind.appendChild(dailyWindSpeed);
      dailyWind.appendChild(dailyWindSpeedUnit);
    }
  }

  function renderForecast(city, country, current, units) {
    const iconWeather = document.querySelector('.icon-weather');
    const iconWindDegree = document.querySelector('.icon-wind-degree');
    const dataCity = document.querySelector('.data-city');
    const dataCountry = document.querySelector('.data-country');
    const dataCurrentTemp = document.querySelector('.data-temp');
    const dataTime = document.querySelector('.data-time');
    const dataFeelsLike = document.querySelector('.data-feels-like');
    const dataTempDesc = document.querySelector('.data-temp-desc');
    const dataWindDesc = document.querySelector('.data-wind-desc');
    const dataWindSpeed = document.querySelector('.data-wind-speed');
    const dataHumidity = document.querySelector('.data-humidity');
    const dataVisibility = document.querySelector('.data-visibility');
    const dataClouds = document.querySelector('.data-clouds');
    const dataRainChance = document.querySelector('.data-rain-chance');
    const dataUvi = document.querySelector('.data-uvi');
    const dataSunrise = document.querySelector('.data-sunrise');
    const dataSunset = document.querySelector('.data-sunset');
    const dataMoon = document.querySelector('.data-moon');
    const dataMoonIcon = document.querySelector('.data-moon-icon');

    const currentIcon = document.createElement('i');
    currentIcon.className = `big-icon far ${convertIcon(
      current.icon,
    )}`;
    iconWeather.textContent = '';
    iconWeather.appendChild(currentIcon);

    iconWindDegree.setAttribute(
      'data-fa-transform',
      `rotate-${current.windDegree}`,
    );

    dataCity.textContent = city;
    dataCountry.textContent = country;
    dataCurrentTemp.textContent = current.temp;
    dataTime.textContent = formatTime(current.time, units).formattedTime;
    dataFeelsLike.textContent = current.feelsLike;
    dataTempDesc.textContent = current.tempDescription.charAt(0).toUpperCase()
      + current.tempDescription.slice(1);
    dataWindDesc.textContent = getWind(current.windSpeed, units).windDesc;
    dataWindSpeed.textContent = getWind(
      current.windSpeed,
      units,
    ).roundedSpeed;
    dataHumidity.textContent = current.humidity;
    dataVisibility.textContent = current.visibility;
    dataClouds.textContent = current.clouds;
    dataRainChance.textContent = current.chanceOfRain;
    dataUvi.textContent = current.uvi;
    dataUvi.className = getUviColor(current.uvi);
    dataSunrise.textContent = formatTime(
      current.sunriseTime,
      units,
    ).formattedSunriseTime;
    dataSunset.textContent = formatTime(
      current.sunsetTime,
      units,
    ).formattedSunsetTime;
    dataMoon.textContent = getMoon(current.moonPhase).moonName;
    dataMoonIcon.setAttribute('src', getMoon(current.moonPhase).moonIcon);
    dataMoonIcon.setAttribute(
      'title',
      getMoon(current.moonPhase).moonName,
    );
  }

  function renderApp(data) {
    const error = document.querySelector('.error');

    if (data.cod) {
      error.className = 'error show';
      mainContainer.className = 'main-container hide';
      error.textContent = data.message.charAt(0).toUpperCase()
        + data.message.slice(1);
    } else {
      error.className = 'error hide';
      mainContainer.className = 'main-container';

      const {
        city, country, current, daily, units,
      } = data;

      changeUnits(units);
      renderForecast(city, country, current, units);
      renderWeeklyForecast(daily, units);
    }
  }

  return {
    loading,
    renderApp,
  };
})();

export default dom;
