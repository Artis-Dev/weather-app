import dom from './dom';
import api from './api';

const handlers = (() => {
  const topNav = document.querySelector('.top-nav');
  const searchInput = document.querySelector('.search-input');

  async function load(input = 'Amsterdam', units = 'metric') {
    dom.loading('loading');
    const weatherData = await api.getLocData(input, units);
    dom.renderApp(weatherData);
    dom.loading('finished');
  }

  function clickHandler() {
    let input;
    let units;
    topNav.addEventListener('click', async (e) => {
      if (e.target.classList.contains('submit') || e.target.parentElement.classList.contains('submit')) {
        e.preventDefault();
        input = searchInput.value;
        load(input, units);
      } else if (e.target.classList.contains('settings-metric')) {
        units = 'metric';
        load(input, units);
      } else if (e.target.classList.contains('settings-imperial')) {
        units = 'imperial';
        load(input, units);
      }
    });
  }

  return {
    clickHandler,
    load,
  };
})();

export default handlers;
