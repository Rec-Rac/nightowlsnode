const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./users');
const Session = require('./session');
const Item = require('./items');

const Transaction = db.define('Transaction', {});
Transaction.belongsTo(User, { as: 'borrower', foreignKey: 'borrower_id', constraints: false });
Transaction.belongsTo(User, { as: 'owner', foreignKey: 'owner_id', constraints: false });
Transaction.belongsTo(Item, { as: 'item', foreignKey: 'item_id', constraints: false });
User.hasMany(Transaction, { foreignKey: 'borrower_id', constraints: false });
User.hasMany(Transaction, { foreignKey: 'owner_id', constraints: false });
Item.hasMany(Transaction, { foreignKey: 'item_id', constraints: false });
// User.hasMany(Session, { foreignKey: 'userId', constraints: false });
// Session.belongsTo(User, {
//   foreignKey: 'userId',
//   as: 'User',
//   constraints: false,
// });

module.exports = Transaction;