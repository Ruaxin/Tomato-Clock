import axios from 'axios';

const appID = 'PxrfUhDx1B86NxdiLYKL1LUw';
const appSecret = 'RQ5DYVyc2TAwrMvV6eMmd4Ui';

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
});

instance.interceptors.request.use(function (config) {
  const xToken = localStorage.getItem('x-token')
  if(xToken){
    config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config;
}, function (error) {
  console.error(error)
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  if(response.headers['x-token']){
    localStorage.setItem('x-token',response.headers['x-token'])
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default instance