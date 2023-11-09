const {
  Worker, isMainThread, parentPort, workerData,
} = require('worker_threads');
const cliProgress = require('cli-progress');
const db = require('../models');

const instance = require('../api/api_instance');

const OrderModel = db.order;
const OrderItemsModel = db.orderItems;
const PaymentModel = db.payment;

const b2 = new cliProgress.Bar({
  barCompleteChar: '#',
  barIncompleteChar: '_',
  hideCursor: true,
  format: ' |- Insert Progress : {percentage}%' + ' - ' + '||{bar}||',

});

const calculatePagesCount = (pageSize, totalCount) => (totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize));

const getOrder = async () => {
  const pageSize = 500;
  let pagesCount = 1;
  console.clear();
  try {
    for (let page = 1; page <= pagesCount; page++) {
      // eslint-disable-next-line no-await-in-loop
      const { data } = await instance.get(`Order/GetOrders?limit=${pageSize}&page=${page}&`);

      b2.start(data.list.length, 0);

      pagesCount = calculatePagesCount(pageSize, data.count);
      console.log(`\n🚀 call api page => ${page} / ${pagesCount}`);
      let index = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const order of data.list) {
        index += 1;
        // eslint-disable-next-line no-await-in-loop, no-loop-func
        await db.sequelize.transaction(async (t) => {
          const orderData = {
            ...order,
            discount: Number(order.discount),
            shippingdiscount: Number(order.shippingdiscount),
            agent: JSON.stringify(order.agent),
          };
          delete orderData.list;
          delete orderData.payments;
          delete orderData.tag;
          delete orderData.trackingList;

          const [foundOrder, created] = await OrderModel.findOrCreate({
            where: { id: order.id },
            defaults: orderData,
            transaction: t,
          });

          if (foundOrder) {
            await OrderModel.update({ status: order.status }, {
              where: {
                id: order.id,
              },
              transaction: t,
            });
          }

          if (created) {
            const orderItems = order.list.map((it) => ({
              orderId: order.id,
              ...it,
              discount: Number(it.discount),
              shippingdiscount: Number(it.shippingdiscount),
            }));
            await OrderItemsModel.bulkCreate(orderItems, { transaction: t });

            await PaymentModel.bulkCreate(order.payments, { transaction: t });
          }
        });

        b2.update(index);
      }
    }

    b2.stop();
    console.log('\x1b[33m Insert success fully! \x1b[0m');
  } catch (error) {
    console.error('🚀 ~ file: order.js:9 ~ getOrder ~ error:', error);
  }
};

async function fetchDataFromAPI() {
  try {
    const { url } = workerData;
    console.log('🚀 ~ file: order.js:95 ~ fetchDataFromAPI ~ url:', url);
    // const response = await instance.get(url);
    parentPort.postMessage({ data: 'response.data' });
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
}

const createWorkerOrder = async () => {
  try {
    const { url } = workerData;
    console.log('🚀 ~ file: order.js:95 ~ fetchDataFromAPI ~ url:', url);
    // const response = await instance.get(url);
    parentPort.postMessage({ data: 'response.data' });
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
};

module.exports = {
  getOrder,
  createWorkerOrder,
};
