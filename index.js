require('dotenv').config();

const db = require('./app/models');

db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
