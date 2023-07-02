const db = require('../models');

const instance = require('../api/api_instance');

const OrderModel = db.order;
const OrderItemsModel = db.orderItems;
const PaymentModel = db.payment;

const getOrder = async () => {
  try {
    const { data } = await instance.get('Order/GetOrders?limit=100');

    for (const order of data.list) {
      await db.sequelize.transaction(async (t) => {
        const [foundOrder, created] = await OrderModel.findOrCreate({
          where: { id: order.id },
          defaults: order,
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
        console.log('insert success :>> ');
      });
    }

    // console.log('🚀 ~ file: order.js:5 ~ getOrder ~ data:', data);
  } catch (error) {
    console.log('🚀 ~ file: order.js:9 ~ getOrder ~ error:', error);
  }
};

module.exports = {
  getOrder,
};
