import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ciranda-tcc.herokuapp.com',
});

export default api;
