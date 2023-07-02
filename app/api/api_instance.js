const axios = require('axios');
require('dotenv').config();
const cliProgress = require('cli-progress');

const instance = axios.create({
  baseURL: process.env.API_HOST,
  headers: {
    //  Authorization: `<Your Auth Token>`,
    storename: process.env.storename,
    apikey: process.env.apikey,
    apisecret: process.env.apisecret,
    'Content-Type': 'application/json',
    timeout: 1000,
  },
  // .. other options
});
const b2 = new cliProgress.Bar({
  barCompleteChar: '#',
  barIncompleteChar: '_',
  format: ' |- Current Progress: {percentage}%' + ' - ' + '||{bar}||',
  fps: 5,
  stream: process.stdout,
  barsize: 30,
});
b2.start(100, 0);

const timer = setInterval(() => {
  // increment value
  b2.increment();

  // set limit
  if (b2.value >= b2.getTotal()) {
    // stop timer
    clearInterval(timer);

    b2.stop();
  }
}, 50);
// Add a response interceptor
instance.interceptors.request.use((config) => {
  timer;
  return config;
});
instance.interceptors.response.use((res) => {
  b2.update(100);
  clearInterval(timer);
  return res;
});

module.exports = instance;
