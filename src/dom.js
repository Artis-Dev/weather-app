import api from './api';

const dom = (() => {
  function renderForecast(query) {
    api.getData(query)
      .then((response) => {
        console.log(response);
      });
  }

  return {
    renderForecast,
  };
})();

export default dom;
