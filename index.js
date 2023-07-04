require('dotenv').config();
const { getOrder } = require('./app/controllers/order');
const { getProduct } = require('./app/controllers/product');

const db = require('./app/models');

try {
  db.sequelize.authenticate();
  db.sequelize.sync({ alter: true });
  console.log('\nConnection has been established successfully.');
} catch (error) {
  console.log(`Failed to sync db: ${error.message}`);
}

getProduct();
getOrder();

setInterval(() => {
  getProduct();
  getOrder();
}, 1000 * 60 * 60 * 6); // 6 house
