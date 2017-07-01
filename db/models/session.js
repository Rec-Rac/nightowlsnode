const Sequelize = require('sequelize');
const db = require('./db');

module.exports = db.define('Session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  expires: Sequelize.DATE,
  data: Sequelize.STRING(50000),
});
