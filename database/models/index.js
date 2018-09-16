const Sequelize = require('sequelize');
const { db } = require('../config');
const { productSeeds, bidSeeds } = require('../seeds/seed');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  condition: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  minimum: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  watchers: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

const Bid = db.define('bid', {
  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

Product.hasMany(Bid);
Bid.belongsTo(Product);

db.sync({ force: false })
  .then(() => console.log('successfully connected to db'))
  // .then(() => db.queryInterface.bulkInsert('products', productSeeds))
  // .then(() => db.queryInterface.bulkInsert('bids', bidSeeds))
  .catch(err => console.log('error syncing database', err));

module.exports = {
  Product,
  Bid,
};
