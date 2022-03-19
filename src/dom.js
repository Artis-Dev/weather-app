const dom = (() => {
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

  function getWindDesc(windSpeed) {
    let windDesc = '';
    if (windSpeed < 0.5) {
      windDesc = 'Calm';
    } else if (windSpeed < 1.6) {
      windDesc = 'Light air';
    } else if (windSpeed < 3.4) {
      windDesc = 'Light breeze';
    } else if (windSpeed < 5.6) {
      windDesc = 'Gentle breeze';
    } else if (windSpeed < 8) {
      windDesc = 'Moderate breeze';
    } else if (windSpeed < 10.8) {
      windDesc = 'Fresh breeze';
    } else if (windSpeed < 13.9) {
      windDesc = 'Strong breeze';
    } else if (windSpeed < 17.2) {
      windDesc = 'High wind';
    } else if (windSpeed < 20.8) {
      windDesc = 'Gale';
    } else if (windSpeed < 24.5) {
      windDesc = 'Strong gale';
    } else if (windSpeed < 28.5) {
      windDesc = 'Storm';
    } else if (windSpeed < 32.7) {
      windDesc = 'Violent storm';
    } else if (windSpeed >= 32.7) {
      windDesc = 'Hurricane';
    }
    return windDesc;
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

    if (data.cod) {
      console.log(data.message);
    } else {
      const { city, country, current } = data;

      headingCity.textContent = city;
      headingCountry.textContent = country;
      headingCurrentTemp.textContent = current.temp;

      iconWeather.className.baseVal = '';
      iconWeather.className.baseVal = `big-icon icon-weather far ${convertIcon(current.icon)}`;

      iconWindDegree.setAttribute(
        'data-fa-transform',
        `rotate-${getArrowDegree(current.windDegree)}`,
      );

      infoTime.textContent = current.time;
      infoFeelsLike.textContent = current.feelsLike;
      infoTempDesc.textContent = current.tempDescription.charAt(0).toUpperCase()
        + current.tempDescription.slice(1);
      infoWindDesc.textContent = getWindDesc(current.windSpeed);

      detailsWindSpeed.textContent = current.windSpeed;
      detailsHumidity.textContent = current.humidity;
      detailsVisibility.textContent = current.visibility;
      detailsClouds.textContent = current.clouds;
      detailsRainChance.textContent = current.chanceOfRain;
      detailsUvi.textContent = current.uvi;

      detailsUvi.className = '';
      detailsUvi.className = getUviColor(current.uvi);

      detailsSunrise.textContent = current.sunriseTime;
      detailsSunset.textContent = current.sunsetTime;
      detailsMoon.textContent = getMoonName(current.moonPhase);

      console.log(data);
    }
  }

  return {
    renderForecast,
  };
})();

export default dom;
