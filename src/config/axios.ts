import axios from 'axios';
//import {createBrowserHistory} from 'history';

//const history = createBrowserHistory();
const appID = 'PxrfUhDx1B86NxdiLYKL1LUw';
const appSecret = 'RQ5DYVyc2TAwrMvV6eMmd4Ui';

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
});

instance.interceptors.request.use((config) => {
  const xToken = localStorage.getItem('x-token');
  if (xToken) {
    config.headers['Authorization'] = `Bearer ${xToken}`;
  }
  return config;
}, (error) => {
  console.error(error);
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token']);
  }
  return response;
}, (error) => {
  if (error.response.status === 401) {
    console.log('重定向');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default instance;