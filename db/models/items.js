const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./users');
const Session = require('./session');

const Item = db.define('Item', {
  title: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
  itemDescription: {
    type: Sequelize.TEXT,
  },
  //Added Price
  price: {
    type : Sequelize.FLOAT,
  },
});
Item.belongsTo(User, {
  as: 'borrower',
  foreignKey: 'borrower_id',
  constraints: false,
});
Item.belongsTo(User, { as: 'owner', foreignKey: 'owner_id', constraints: false });
User.hasMany(Item, { foreignKey: 'borrower_id', constraints: false });
User.hasMany(Item, { foreignKey: 'owner_id', constraints: false });
User.hasMany(Session, { foreignKey: 'userId', constraints: false });
Session.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User',
  constraints: false,
});

module.exports = Item;
