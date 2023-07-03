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

const calculatePagesCount = (pageSize, totalCount) =>
  // we suppose that if we have 0 items we want 1 empty page
  (totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize));

const getOrder = async () => {
  const pageSize = 500;
  let pagesCount = 1;
  try {
    for (let page = 1; page <= pagesCount; page++) {
      const { data } = await instance.get(`Order/GetOrders?limit=${pageSize}&page=${page}`);

      b2.start(data.list.length, 0);

      pagesCount = calculatePagesCount(pageSize, data.count);
      console.log(`🚀 call api page => ${page} / ${pagesCount}`);
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
