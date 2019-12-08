import axios from 'axios';
import * as ls from 'local-storage';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

instance.interceptors.request.use((config) => {
  // Do something before request is sent
  const token = ls.get('app_session');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers = Object.assign({}, config.headers, { Authorization: token });
  }
  return config;
  // eslint-disable-next-line arrow-body-style
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

export default instance;
