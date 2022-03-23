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

  function getMoonIcon(moonPhase) {
    let moonIcon = '';
    let moonName = '';

    if (moonPhase === 0 || moonPhase === 1) {
      moonName = 'New Moon';
      moonIcon = './svg/moon-new.svg';
    }
    if (moonPhase === 0.25) {
      moonName = 'First Quarter Moon';
      moonIcon = './svg/moon-first-quarter.svg';
    }
    if (moonPhase === 0.5) {
      moonName = 'Full Moon';
      moonIcon = './svg/moon-full.svg';
    }
    if (moonPhase === 0.75) {
      moonName = 'Last Quarter Moon';
      moonIcon = './svg/moon-last-quarter.svg';
    }
    if (moonPhase > 0 && moonPhase < 0.25) {
      moonName = 'Waxing Crescent';
      moonIcon = './svg/moon-waxing-crescent.svg';
    }
    if (moonPhase > 0.25 && moonPhase < 0.5) {
      moonName = 'Waxing Gibbous';
      moonIcon = './svg/moon-waxing-gibbous.svg';
    }
    if (moonPhase > 0.5 && moonPhase < 0.75) {
      moonName = 'Waning Gibbous';
      moonIcon = './svg/moon-waning-gibbous.svg';
    }
    if (moonPhase > 0.75 && moonPhase < 1) {
      moonName = 'Waning Crescent';
      moonIcon = './svg/moon-waning-crescent.svg';
    }
    return { moonName, moonIcon };
  }

  function changeUnits(units) {
    const metricButton = document.querySelector('.units-metric');
    const imperialButton = document.querySelector('.units-imperial');
    const tempUnits = document.querySelectorAll('.temp-unit');
    const speedUnits = document.querySelectorAll('.speed-unit');

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
      formattedSunriseTime = format(data, 'h:mm aa');
      formattedSunsetTime = format(data, 'h:mm aa');
      formattedWeekDay = format(data, 'EEEE');
      return {
        formattedTime, formattedSunriseTime, formattedSunsetTime, formattedWeekDay,
      };
    }
    formattedTime = format(data, 'EEEE d MMMM yyyy | H:mm');
    formattedSunriseTime = format(data, 'H:mm');
    formattedSunsetTime = format(data, 'H:mm');
    formattedWeekDay = format(data, 'EEEE');
    return {
      formattedTime, formattedSunriseTime, formattedSunsetTime, formattedWeekDay,
    };
  }

  function renderForecast(data) {
    const error = document.querySelector('.error');
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
    const weeklyList = document.querySelector('.weekly-list');

    if (data.cod) {
      error.className = 'error show';
      mainContainer.className = 'main-container hide';
      error.textContent = data.message.charAt(0).toUpperCase()
      + data.message.slice(1);
    } else {
      error.className = 'error hide';
      mainContainer.className = 'main-container';

      const {
        city, country, units, current, daily,
      } = data;

      headingCity.textContent = city;
      headingCountry.textContent = country;
      headingCurrentTemp.textContent = current.temp;

      iconWeather.className.baseVal = '';
      iconWeather.className.baseVal = `big-icon icon-weather far ${convertIcon(current.icon)}`;

      iconWindDegree.setAttribute(
        'data-fa-transform',
        `rotate-${getArrowDegree(current.windDegree)}`,
      );

      infoTime.textContent = formatTime(current.time, units).formattedTime;
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

      detailsSunrise.textContent = formatTime(current.sunriseTime, units).formattedSunriseTime;
      detailsSunset.textContent = formatTime(current.sunsetTime, units).formattedSunsetTime;
      detailsMoon.setAttribute('src', getMoonIcon(current.moonPhase).moonIcon);
      detailsMoon.setAttribute('title', getMoonIcon(current.moonPhase).moonName);

      weeklyList.textContent = '';

      for (let i = 0; i < daily.length; i += 1) {
        const weeklyDay = document.createElement('div');
        weeklyDay.classList.add('weekly-day');
        weeklyList.appendChild(weeklyDay);

        const weeklyDateSpan = document.createElement('span');
        weeklyDateSpan.classList.add('data-weekly-date', 'weekly-day-date');
        weeklyDateSpan.textContent = formatTime(daily[i].date, units).formattedWeekDay;
        weeklyDay.appendChild(weeklyDateSpan);

        // const weeklyWeatherSpan = document.createElement('span');
        // weeklyWeatherSpan.classList.add('weekly-day-weather');
        // weeklyDay.appendChild(weeklyWeatherSpan);

        const weeklyWeatherDay = document.createElement('span');
        weeklyWeatherDay.className = 'weekly-day-day-temp';
        weeklyWeatherDay.setAttribute(
          'title',
          daily[i].tempDescription.charAt(0).toUpperCase()
            + daily[i].tempDescription.slice(1),
        );
        weeklyDay.appendChild(weeklyWeatherDay);

        const weeklyWeatherIcon = document.createElement('i');
        weeklyWeatherIcon.className = `icon-weekly-weather far ${convertIcon(daily[i].icon)} fa-fw`;
        weeklyWeatherDay.appendChild(weeklyWeatherIcon);

        const weeklyWeatherDayTemp = document.createElement('span');
        weeklyWeatherDayTemp.className = 'data-weekly-temp';
        weeklyWeatherDayTemp.textContent = daily[i].dayTemp;
        weeklyWeatherDay.appendChild(weeklyWeatherDayTemp);

        const weeklyWeatherDayTempUnit = document.createElement('span');
        weeklyWeatherDayTempUnit.className = 'temp-unit';
        weeklyWeatherDay.appendChild(weeklyWeatherDayTempUnit);

        const weeklyWeatherNight = document.createElement('span');
        weeklyWeatherNight.className = 'weekly-day-night-temp';
        weeklyDay.appendChild(weeklyWeatherNight);

        const weeklyWeatherNightTemp = document.createElement('span');
        weeklyWeatherNightTemp.className = 'data-weekly-night-temp';
        weeklyWeatherNightTemp.textContent = daily[i].nightTemp;
        weeklyWeatherNight.appendChild(weeklyWeatherNightTemp);

        const weeklyWeatherNightTempUnit = document.createElement('span');
        weeklyWeatherNightTempUnit.className = 'temp-unit';
        weeklyWeatherNight.appendChild(weeklyWeatherNightTempUnit);

        const weeklyWindSpan = document.createElement('span');
        weeklyWindSpan.classList.add('weekly-day-wind');
        weeklyWindSpan.setAttribute(
          'title',
          getWind(daily[i].windSpeed, units).windDesc,
        );
        weeklyDay.appendChild(weeklyWindSpan);

        const weeklyWindIcon = document.createElement('i');
        weeklyWindIcon.className = 'icon-weekly-wind-degree far fa-long-arrow-up';
        weeklyWindIcon.setAttribute(
          'data-fa-transform',
          `rotate-${getArrowDegree(daily[i].windDegree)}`,
        );
        weeklyWindSpan.appendChild(weeklyWindIcon);

        const weeklyWindSpeed = document.createElement('span');
        weeklyWindSpeed.className = 'data-weekly-wind-speed';
        weeklyWindSpeed.textContent = getWind(daily[i].windSpeed, units).roundedSpeed;
        weeklyWindSpan.appendChild(weeklyWindSpeed);

        const weeklyWindSpeedUnit = document.createElement('span');
        weeklyWindSpeedUnit.className = 'speed-unit';
        weeklyWindSpan.appendChild(weeklyWindSpeedUnit);
      }

      changeUnits(units);

      console.log(data);
    }
  }

  return {
    loading,
    renderForecast,
  };
})();

export default dom;
