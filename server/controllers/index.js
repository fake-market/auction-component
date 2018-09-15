const Sequelize = require('sequelize');
const { Product, Bid } = require('../../database/models');

const AuctionController = {
  GET: (req, res) => {
    Product.find({ where: req.query })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },

  POST: (req, res) => {
    Product.update(
      { watchers: Sequelize.literal('watchers + 1') },
      { where: req.query },
    )
      .then(() => {
        res.status(201).send();
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
};

const BidController = {
  GET: (req, res) => {
    Promise.all([
      Bid.count({ where: req.query }),
      Bid.max('amount', { where: req.query }),
    ])
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },

  POST: (req, res) => {
    Product.find({ where: { id: req.body.id } })
      .then(foundProduct => {
        foundProduct.createBid({
          amount: req.body.bidInput,
        });
      })
      .then(() => {
        res.status(201).send();
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
};

module.exports = {
  AuctionController,
  BidController,
};
