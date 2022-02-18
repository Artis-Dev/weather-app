import api from './api';

const handlers = (() => {
  const searchSubmit = document.querySelector('.search-submit');
  const searchInput = document.querySelector('.search-input');

  function clickHandler() {
    searchSubmit.addEventListener('click', () => {
      console.log(searchInput.value);
      api.getData(searchInput.value);
    });
  }

  return {
    clickHandler,
  };
})();

export default handlers;
