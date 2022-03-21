import dom from './dom';
import api from './api';

const handlers = (() => {
  const searchSubmit = document.querySelector('.search-submit');
  const searchInput = document.querySelector('.search-input');

  let input = '';
  let units = 'metric';

  function clickHandler() {
    searchSubmit.addEventListener('click', async (e) => {
      e.preventDefault();
      input = searchInput.value;
      const weatherData = await api.getLocData(input, units);
      dom.renderForecast(weatherData);
    });
  }

  return {
    clickHandler,
  };
})();

export default handlers;
