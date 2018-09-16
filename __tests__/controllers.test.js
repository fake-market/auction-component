const SequelizeMock = require('sequelize-mock');

const dbMock = new SequelizeMock();

const Product = dbMock.define('product', {
  name: 'testProduct',
  condition: 'testCondition',
  minimum: 100,
  watchers: 30,
});

const Bid = dbMock.define('bid', {
  amount: 140.0,
});

Product.hasMany(Bid);
Bid.belongsTo(Product);

describe('AuctionController', () => {
  it('should fetch product data on a get request', () =>
    Product.find({
      where: { id: 1 },
    }).then(data => {
      expect(data.name).toEqual('testProduct');
      expect(data.condition).toEqual('testCondition');
      expect(data.minimum).toEqual(100);
      expect(data.watchers).toEqual(30);
    }));
});
