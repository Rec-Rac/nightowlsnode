const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./users');
const Session = require('./session');

const Message= db.define('Message', {
  text: {
    type: Sequelize.STRING,
  }
});
Message.belongsTo(User, {
  as: 'borrower',
  foreignKey: 'borrower_id',
  constraints: false,
});
Message.belongsTo(User, { as: 'owner', foreignKey: 'owner_id', constraints: false });
User.hasMany(Message, { foreignKey: 'borrower_id', constraints: false });
User.hasMany(Message, { foreignKey: 'owner_id', constraints: false });

module.exports = Message;