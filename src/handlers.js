import dom from './dom';
import api from './api';

const handlers = (() => {
  const topNav = document.querySelector('.top-nav');
  const searchInput = document.querySelector('.search-input');

  let input = 'Amsterdam';
  let units = 'metric';

  function clickHandler() {
    topNav.addEventListener('click', async (e) => {
      if (e.target.classList.contains('search-submit')) {
        e.preventDefault();
        input = searchInput.value;
        const weatherData = await api.getLocData(input, units);
        dom.renderForecast(weatherData);
      } else if (e.target.classList.contains('units-metric')) {
        units = 'metric';
        const weatherData = await api.getLocData(input, units);
        dom.renderForecast(weatherData);
      } else if (e.target.classList.contains('units-imperial')) {
        units = 'imperial';
        const weatherData = await api.getLocData(input, units);
        dom.renderForecast(weatherData);
      }
    });
  }

  return {
    clickHandler,
  };
})();

export default handlers;
