require('dotenv').config();
// const { getOrder, createWorkerOrder } = require('./app/controllers/order');
const {
  Worker, isMainThread,
} = require('worker_threads');
// const getOrder = require('./app/controllers/getOrder');

const instance = require('./app/api/api_instance');
const db = require('./app/models');

try {
  db.sequelize.authenticate();
  db.sequelize.sync({ alter: true });
  console.log('\nConnection has been established successfully.');
} catch (error) {
  console.log(`Failed to sync db: ${error.message}`);
}

// getProduct();
// getOrder();

// setInterval(() => {
//   getProduct();
//   getOrder();
// }, 1000 * 60 * 60 * 6); // 6 house
const calculatePagesCount = (pageSize, totalCount) => (totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize));

async function createWorkerOrder() {
  if (isMainThread) {
  // This is the main thread

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
      const worker = new Worker('./app/controllers/worker.js', {
        workerData: { url: uri },
      });

      workerThreads.push(worker);

      worker.on('exit', () => {
        console.log('Worker thread has finished.');
      });
      worker.on('message', (message) => {
        console.log(`URL ${message.url}: ${message.data}`);
      });
    });
  }
}

createWorkerOrder();
