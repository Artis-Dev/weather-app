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

  function renderForecast(data) {
    const headingCity = document.querySelector('.data-city');
    const headingCountry = document.querySelector('.data-country');
    const headingCurrentTemp = document.querySelector('.data-temp');
    const headingWindSpeed = document.querySelector('.data-wind-speed');
    const infoCoordLon = document.querySelector('.data-coord-lon');
    const infoCoordLat = document.querySelector('.data-coord-lat');
    const infoFeelsLike = document.querySelector('.data-feels-like');
    const infoTempDesc = document.querySelector('.data-temp-desc');
    const iconCurrentTemp = document.querySelector('.icon-current-temp');

    const {
      city, country, coord, current,
    } = data;

    headingCity.textContent = city;
    headingCountry.textContent = country;
    headingCurrentTemp.textContent = Math.round(current.temp);
    headingWindSpeed.textContent = Math.round(current.windSpeed);

    infoCoordLon.textContent = coord.lon;
    infoCoordLat.textContent = coord.lat;
    infoFeelsLike.textContent = Math.round(current.feelsLike);
    infoTempDesc.textContent = current.tempDescription.charAt(0).toUpperCase()
      + current.tempDescription.slice(1);

    iconCurrentTemp.className = '';
    iconCurrentTemp.className = `big-icon icon-current-temp far ${convertIcon(current.icon)}`;

    console.log(data);
  }

  return {
    renderForecast,
  };
})();

export default dom;
