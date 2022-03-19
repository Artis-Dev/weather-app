import handlers from './handlers';
import api from './api';
import dom from './dom';

async function renderDefault(city) {
  const weatherData = await api.getLocData(city);
  dom.renderForecast(weatherData);
}

renderDefault('Amsterdam');
handlers.clickHandler();
