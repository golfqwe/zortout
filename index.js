require('dotenv').config();
const { getOrder } = require('./app/controllers/order');

const db = require('./app/models');

try {
  db.sequelize.sync();
  console.log('\nConnection has been established successfully.');
} catch (error) {
  console.log(`Failed to sync db: ${error.message}`);
}

setInterval(() => {
  // getOrder();
}, 1000 * 60 * 20); // 20 minutes
