const cliProgress = require('cli-progress');
const db = require('../models');

const instance = require('../api/api_instance');

const OrderModel = db.order;
const OrderItemsModel = db.orderItems;
const PaymentModel = db.payment;

const b2 = new cliProgress.Bar({
  barCompleteChar: '#',
  barIncompleteChar: '_',
  format: ' |- Insert Progress : {percentage}%' + ' - ' + '||{bar}||',
  fps: 5,
  stream: process.stdout,
  barsize: 30,
});

const getOrder = async () => {
  // console.log('\n');
  try {
    const { data } = await instance.get('Order/GetOrders');
    b2.start(data.list.length, 0);
    let index = 0;
    for (const order of data.list) {
      index += 1;
      await db.sequelize.transaction(async (t) => {
        const orderData = { ...order };
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
          const orderItems = order.list.map((it) => ({ orderId: order.id, ...it }));
          await OrderItemsModel.bulkCreate(orderItems, { transaction: t });

          await PaymentModel.bulkCreate(order.payments, { transaction: t });
        }
      });

      b2.update(Math.floor((index * data.list.length) + 1));
    }

    b2.stop();
    console.log('\x1b[33m Insert success fully! \x1b[0m');
  } catch (error) {
    console.error('🚀 ~ file: order.js:9 ~ getOrder ~ error:', error);
  }
};

module.exports = {
  getOrder,
};
