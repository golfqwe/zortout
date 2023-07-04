const Sequelize = require('sequelize');
const constants = require('../config/constants');

const dbConfig = constants.database;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
  dialectOptions: {
    options: {
      encrypt: true,
      enableArithAbort: false,
      cryptoCredentialsDetails: {
        minVersion: 'TLSv1',
      },
    },
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.order = require('./order')(sequelize, Sequelize);
db.orderItems = require('./orderItems')(sequelize, Sequelize);
db.payment = require('./payment')(sequelize, Sequelize);
db.product = require('./product')(sequelize, Sequelize);

module.exports = db;
