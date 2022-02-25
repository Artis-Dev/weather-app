import dom from './dom';

const handlers = (() => {
  const searchSubmit = document.querySelector('.search-submit');
  const searchInput = document.querySelector('.search-input');

  function clickHandler() {
    searchSubmit.addEventListener('click', () => {
      dom.renderForecast(searchInput.value);
    });
  }

  return {
    clickHandler,
  };
})();

export default handlers;
