import api from './api';

api.getData('Vilnius').then((response) => {
  console.log(response);
});
