require('dotenv').config();
const {
  Worker, isMainThread,
} = require('worker_threads');
const { getProduct } = require('./app/controllers/product');

const instance = require('./app/api/api_instance');
const db = require('./app/models');

try {
  db.sequelize.authenticate();
  db.sequelize.sync({ alter: true });
  console.log('\nConnection has been established successfully.');
} catch (error) {
  console.log(`Failed to sync db: ${error.message}`);
}

const calculatePagesCount = (pageSize, totalCount) => (totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize));

async function createWorkerOrder() {
  if (isMainThread) {
  // This is the main thread
    console.log('\u{1F6A9} Worker thread Order has Create.');
    // Create a worker thread
    const pageLimit = 500;

    const { data } = await instance.get('Order/GetOrders?limit=1');

    const pagesCount = calculatePagesCount(pageLimit, data.count);
    // Define the API URLs you want to call
    const apiUrls = [];

    for (let index = 1; index <= pagesCount; index += 1) {
      apiUrls.push(`Order/GetOrders?limit=${pageLimit}&page=${index}`);
    }
    const workerThreads = [];

    apiUrls.forEach((uri) => {
      const worker = new Worker('./app/controllers/workerOrder.js', {
        workerData: { url: uri },
      });

      workerThreads.push(worker);

      worker.on('exit', () => {
        console.log('Worker thread has finished.');
      });
      worker.on('error', (error) => {
        console.error('\u{274C} ', error);
      });
      worker.on('message', (message) => {
        console.log(`URL ${message.url}: ${message.data}`);
      });
    });
  }
}

async function createWorkerReturnOrder() {
  if (isMainThread) {
  // This is the main thread
    console.log('\u{1F6A9} Worker thread Return Order has Create.');
    // Create a worker thread
    const pageLimit = 500;

    const { data } = await instance.get('ReturnOrder/GetReturnOrders?limit=1');

    const pagesCount = calculatePagesCount(pageLimit, data.count);
    // Define the API URLs you want to call
    const apiUrls = [];

    for (let index = 1; index <= pagesCount; index += 1) {
      apiUrls.push(`ReturnOrder/GetReturnOrders?limit=${pageLimit}&page=${index}`);
    }
    const workerThreads = [];

    apiUrls.forEach((uri) => {
      const worker = new Worker('./app/controllers/workerReturnOrder.js', {
        workerData: { url: uri },
      });

      workerThreads.push(worker);

      worker.on('exit', () => {
        console.log('Worker thread has finished.');
      });
      worker.on('error', (error) => {
        console.error('\u{274C} ', error);
      });
      worker.on('message', (message) => {
        console.log(`URL ${message.url}: ${message.data}`);
      });
    });
  }
}

setInterval(() => {
  getProduct();
  createWorkerReturnOrder();
  createWorkerOrder();
}, 1000 * 60 * 60 * 6); // 6 house
