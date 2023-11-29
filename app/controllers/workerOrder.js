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
          amount: parseFloat(order.amount || 0).toFixed(2),
          vatamount: parseFloat(order.vatamount || 0).toFixed(2),
          paymentamount: parseFloat(order.paymentamount || 0).toFixed(2),
          platformdiscount: parseFloat(order.platformdiscount || 0).toFixed(2),
          sellerdiscount: parseFloat(order.sellerdiscount || 0).toFixed(2),
          shippingdiscount: parseFloat(order.shippingdiscount || 0).toFixed(2),
          discountamount: parseFloat(order.discountamount || 0).toFixed(2),
          voucheramount: parseFloat(order.voucheramount || 0).toFixed(2),
          totalproductamount: parseFloat(order.totalproductamount || 0).toFixed(2),
          discount: order.discount ? parseInt(order.discount.toString().replace(/\,/g, ''), 10) : 0,
          agent: JSON.stringify(order.agent),
          orderdate: order.shippingdate,
          orderdateString: order.shippingdateString,
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
            totalprice: parseFloat(it.totalprice || 0).toFixed(2),
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
