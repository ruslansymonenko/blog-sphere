import axios from 'axios';

import { SERVER_URL } from '../consts/consts';

const instance = axios.create({
  baseURL: SERVER_URL
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default instance