const Sequelize = require('sequelize');
const { database: dbConfig } = require('../config/constants');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.order = require('./order')(sequelize, Sequelize);
db.orderItems = require('./orderItems')(sequelize, Sequelize);
db.payment = require('./payment')(sequelize, Sequelize);

module.exports = db;
