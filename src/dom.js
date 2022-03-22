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

  function getArrowDegree(windDegree) {
    let arrowDegree = 0;
    if (windDegree === 0) {
      arrowDegree = 180;
    } else if (windDegree > 0) {
      arrowDegree = windDegree - 180;
    } else {
      arrowDegree = windDegree + 180;
    }
    return arrowDegree;
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

  function getMoonName(moonPhase) {
    if (moonPhase === 0 || moonPhase === 1) {
      return 'new moon';
    }
    if (moonPhase === 0.25) {
      return 'first quarter moon';
    }
    if (moonPhase === 0.5) {
      return 'full moon';
    }
    if (moonPhase === 0.75) {
      return 'last quarter moon';
    }
    if (moonPhase > 0 && moonPhase < 0.25) {
      return 'waxing crescent';
    }
    if (moonPhase > 0.25 && moonPhase < 0.5) {
      return 'waxing gibous';
    }
    if (moonPhase > 0.5 && moonPhase < 0.75) {
      return 'waning gibous';
    }
    if (moonPhase > 0.75 && moonPhase < 1) {
      return 'waning crescent';
    }
    return false;
  }

  function changeUnits(units) {
    const metricButton = document.querySelector('.units-metric');
    const imperialButton = document.querySelector('.units-imperial');
    const tempUnits = document.querySelectorAll('.temp-unit');
    const speedUnit = document.querySelector('.speed-unit');

    let tempUnit;
    let windUnit;

    if (units === 'metric') {
      metricButton.className = 'units-metric active';
      imperialButton.className = 'units-imperial';
      tempUnit = '°C';
      windUnit = 'm/s';
    } else {
      imperialButton.className = 'units-imperial active';
      metricButton.className = 'units-metric';
      tempUnit = '°F';
      windUnit = 'mph';
    }

    tempUnits.forEach((unit) => {
      unit.textContent = tempUnit;
    });
    speedUnit.textContent = windUnit;
  }

  function formatTime(data, units) {
    const { time, sunriseTime, sunsetTime } = data;
    let formattedTime;
    let formattedSunriseTime;
    let formattedSunsetTime;
    if (units === 'imperial') {
      formattedTime = format(time, 'EEEE d MMMM yyyy | h:mm aa');
      formattedSunriseTime = format(sunriseTime, 'h:mm aa');
      formattedSunsetTime = format(sunsetTime, 'h:mm aa');
      return { formattedTime, formattedSunriseTime, formattedSunsetTime };
    }
    formattedTime = format(time, 'EEEE d MMMM yyyy | H:mm');
    formattedSunriseTime = format(sunriseTime, 'H:mm');
    formattedSunsetTime = format(sunsetTime, 'H:mm');
    return { formattedTime, formattedSunriseTime, formattedSunsetTime };
  }

  function renderForecast(data) {
    const headingCity = document.querySelector('.data-city');
    const headingCountry = document.querySelector('.data-country');
    const headingCurrentTemp = document.querySelector('.data-temp');
    const infoTime = document.querySelector('.data-time');
    const iconWeather = document.querySelector('.icon-weather');
    const iconWindDegree = document.querySelector('.icon-wind-degree');
    const infoFeelsLike = document.querySelector('.data-feels-like');
    const infoTempDesc = document.querySelector('.data-temp-desc');
    const infoWindDesc = document.querySelector('.data-wind-desc');
    const detailsWindSpeed = document.querySelector('.data-wind-speed');
    const detailsHumidity = document.querySelector('.data-humidity');
    const detailsVisibility = document.querySelector('.data-visibility');
    const detailsClouds = document.querySelector('.data-clouds');
    const detailsRainChance = document.querySelector('.data-rain-chance');
    const detailsUvi = document.querySelector('.data-uvi');
    const detailsSunrise = document.querySelector('.data-sunrise');
    const detailsSunset = document.querySelector('.data-sunset');
    const detailsMoon = document.querySelector('.data-moon');
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
        city, country, units, current,
      } = data;

      changeUnits(units);

      headingCity.textContent = city;
      headingCountry.textContent = country;
      headingCurrentTemp.textContent = current.temp;

      iconWeather.className.baseVal = '';
      iconWeather.className.baseVal = `big-icon icon-weather far ${convertIcon(current.icon)}`;

      iconWindDegree.setAttribute(
        'data-fa-transform',
        `rotate-${getArrowDegree(current.windDegree)}`,
      );

      infoTime.textContent = formatTime(current, units).formattedTime;
      infoFeelsLike.textContent = current.feelsLike;
      infoTempDesc.textContent = current.tempDescription.charAt(0).toUpperCase()
        + current.tempDescription.slice(1);
      infoWindDesc.textContent = getWind(current.windSpeed, units).windDesc;

      detailsWindSpeed.textContent = getWind(current.windSpeed, units).roundedSpeed;
      detailsHumidity.textContent = current.humidity;
      detailsVisibility.textContent = current.visibility;
      detailsClouds.textContent = current.clouds;
      detailsRainChance.textContent = current.chanceOfRain;
      detailsUvi.textContent = current.uvi;

      detailsUvi.className = '';
      detailsUvi.className = getUviColor(current.uvi);

      detailsSunrise.textContent = formatTime(current, units).formattedSunriseTime;
      detailsSunset.textContent = formatTime(current, units).formattedSunsetTime;
      detailsMoon.textContent = getMoonName(current.moonPhase);

      console.log(data);
    }
  }

  return {
    loading,
    renderForecast,
  };
})();

export default dom;
