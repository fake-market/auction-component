import React from 'react';
import axios from 'axios';
import CSSModules from 'react-css-modules';
import styles from './Auction.css';

class Auction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      condition: '',
      currentBid: 0,
      minimum: 0,
      watchers: 0,
      daysLeft: 0,
      hoursLeft: 0,
      bids: 0,
      bidAmount: 0
    }
    this.fetchProductInfo = this.fetchProductInfo.bind(this);
    this.fetchProductBids = this.fetchProductBids.bind(this);
    this.handleBidChange = this.handleBidChange.bind(this);
    this.handleBidSubmit = this.handleBidSubmit.bind(this);
    this.addWatcher = this.addWatcher.bind(this);
  }

  componentDidMount() {
    this.fetchProductInfo();
  }

  fetchProductInfo() {
    axios.get('/api/auction')
    .then(({ data }) => {
      const day = 24 * 60 * 60 * 1000;
      const hour = 60 * 60 * 1000;

      let end = new Date(Date.parse(data.createdAt));
      end.setDate(end.getDate() + 7);
      let timeLeft = Math.floor((end - new Date()));
      let daysLeft = Math.floor(timeLeft / day);
      let hoursLeft = Math.floor((timeLeft - daysLeft * day) / hour);

      this.setState({
        id: data.id,
        name: data.name,
        condition: data.condition,
        minimum: data.minimum,
        watchers: data.watchers,
        daysLeft: daysLeft,
        hoursLeft: hoursLeft
      })
    }).then(() => {
      this.fetchProductBids();
    }).catch(err => {
      console.log('error fetching product data', err);
    })
  }

  fetchProductBids() {
    axios.get('/api/auction/bid')
    .then(({ data }) => {
      this.setState({
        bids: data[0],
        currentBid: data[1].toFixed(2)
      })
    }).catch(err => {
      console.log('error fetching product bids', err);
    })
  }

  handleBidChange(e) {
    this.setState({
      bidAmount: e.target.value
    }, () => console.log('this.state.bidAmount =', this.state.bidAmount))
  }

  handleBidSubmit() {
    if (this.state.bidAmount < this.state.minimum) {
      alert ('Invalid bid, your bid is below the minimum');
    } else if (this.state.bidAmount < this.state.currentBid) {
      alert ('Invalid bid, your bid is lower than the current bid');
    } else {
      axios.post('/api/auction/bid', {
        id: this.state.id,
        bidAmount: this.state.bidAmount
      }).then(data => {
        this.setState({
          bids: data.bids,
          currentBid: data.currentBid
        })
      }).catch(err => {
        console.log('error submitting bid', err);
      })
    }
  }

  addWatcher() {
    axios.post('/api/auction', {
      id: this.state.id
    }).then(data => {
      console.log('now watching item');
      this.componentDidMount();
    }).catch(err => {
      console.log('we\'re sorry, there was an error when trying to add this item to your watchlist');
    })
  }

  render() {
    return (
      <div>
        <div styleName="item-name">{this.state.name}</div>
        <div>
          <div id="condition">Condition: {this.state.condition}</div>
          <div id="time-left">Time left: {this.state.daysLeft} d {this.state.hoursLeft} h</div>
        </div>
        <div>
          <div>
            <span id="currentBid">Current bid: ${this.state.currentBid}</span>
            <span id="bids">[ <a href="#">{this.state.bids} bids </a> ]</span>
          </div>
          <form id="bid-form" onSubmit={this.handleBidSubmit}>
            <span><input onChange={this.handleBidChange}/></span>
            <span><button>Place Bid</button></span>
            <div>Enter ${Number(this.state.currentBid) + 0.01} or more</div>
          </form>
          <div id="minimum">Minimum Bid: {this.state.minimum}</div>
          <div id="watchers-button">
            <button onClick={this.addWatcher}>Add to watch list</button>
          </div>
        <div id="watchers">{this.state.watchers} watchers</div>
        </div>
      </div>
    )
  }
}

export default Auction;