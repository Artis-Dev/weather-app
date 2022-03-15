import dom from './dom';
import api from './api';

const handlers = (() => {
  const searchSubmit = document.querySelector('.search-submit');
  const searchInput = document.querySelector('.search-input');

  function clickHandler() {
    searchSubmit.addEventListener('click', async (e) => {
      e.preventDefault();
      const weatherData = await api.getLocData(searchInput.value);
      dom.renderForecast(weatherData);
    });
  }

  return {
    clickHandler,
  };
})();

export default handlers;
