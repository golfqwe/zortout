const { parentPort, workerData } = require('worker_threads');

const { url } = workerData;

const instance = require('../api/api_instance');
const db = require('../models');

const OrderModel = db.order;
const OrderItemsModel = db.orderItems;
const PaymentModel = db.payment;

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
    });
    parentPort.postMessage({ url, data: 'insert success \u{2705}' });
  } catch (error) {
    parentPort.postMessage({ url, error: error.message });
  }
}

fetchDataFromAPI();
