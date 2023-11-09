const { parentPort, workerData } = require('worker_threads');

const { url } = workerData;

const instance = require('../api/api_instance');
const db = require('../models');

const returnOrderModel = db.returnOrder;

async function fetchDataFromAPI() {
  try {
    parentPort.postMessage({ url, data: 'wait for call api \u{23F0}' });
    const { data } = await instance.get(url);

    data.list.forEach(async (order) => {
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

        const [foundOrder] = await returnOrderModel.findOrCreate({
          where: { id: order.id },
          defaults: orderData,
          transaction: t,
        });

        if (foundOrder) {
          await returnOrderModel.update({ status: order.status }, {
            where: {
              id: order.id,
            },
            transaction: t,
          });
        }
      });
    });
    parentPort.postMessage({ url, data: 'insert success \u{2705}' });
  } catch (error) {
    parentPort.postMessage({ url, error: error.message });
  }
}

fetchDataFromAPI();
