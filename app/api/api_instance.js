const axios = require('axios');
require('dotenv').config();

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
// const loading = (function () {
//   const h = ['|', '/', '-', '\\'];
//   let i = 0;

//   return setInterval(() => {
//     i = (i > 3) ? 0 : i;
//     console.clear();
//     console.log(h[i]);
//     i++;
//   }, 300);
// }());

// Add a response interceptor
// instance.interceptors.request.use((config) =>
//   // loading();
//   config);
// instance.interceptors.response.use((res) =>
//   // clearInterval(loading());
//   res);

module.exports = instance;
