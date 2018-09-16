import React from 'react';
import { shallow, mount } from 'enzyme';
import Auction from '../client/src/components/Auction';
import * as postBid from '../client/src/services/postBid';

jest.mock('../client/src/services/getProductInfo');
jest.mock('../client/src/services/getBids');

describe('AuctionComponent', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls componentDidMount on mount', done => {
    const componentDidMountSpy = jest.spyOn(
      Auction.prototype,
      'componentDidMount',
    );
    const auctionWrapper = mount(<Auction />);

    setTimeout(() => {
      auctionWrapper.update();
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
      auctionWrapper.unmount();
      done();
    });
  });

  it('calls fetchProductInfo on componentDidMount', done => {
    const fetchProductInfoSpy = jest.spyOn(
      Auction.prototype,
      'fetchProductInfo',
    );
    const auctionWrapper = mount(<Auction />);

    setTimeout(() => {
      auctionWrapper.update();
      expect(fetchProductInfoSpy).toHaveBeenCalledTimes(1);
      auctionWrapper.unmount();
      done();
    });
  });

  it('calls fetchBids on fetchProductInfo', done => {
    const fetchBidsSpy = jest.spyOn(Auction.prototype, 'fetchBids');
    const auctionWrapper = shallow(<Auction />);

    setTimeout(() => {
      auctionWrapper.update();
      expect(fetchBidsSpy).toHaveBeenCalledTimes(1);
      auctionWrapper.unmount();
      done();
    });
  });

  it('fetches product info', done => {
    const auctionWrapper = shallow(<Auction />);

    setTimeout(() => {
      const { state } = auctionWrapper.instance();
      expect(state.condition).toEqual('new');
      expect(state.minimum).toEqual(10);
      expect(state.watchers).toEqual(3);
      auctionWrapper.unmount();
      done();
    });
  });

  it('fetches bids', done => {
    const auctionWrapper = shallow(<Auction />);

    setTimeout(() => {
      auctionWrapper.update();
      const { state } = auctionWrapper.instance();
      expect(state.bidCount).toEqual('5 bids');
      expect(state.currentBid).toEqual('100.00');
      auctionWrapper.unmount();
      done();
    });
  });

  it('simulates onChange events', done => {
    const handleBidChangeSpy = jest.spyOn(Auction.prototype, 'handleBidChange');
    const auctionWrapper = shallow(<Auction />);

    setTimeout(() => {
      auctionWrapper.update();
      auctionWrapper
        .find('.bid-input')
        .simulate('change', { target: { value: '200.00' } });
      expect(handleBidChangeSpy).toHaveBeenCalledTimes(1);
      auctionWrapper.unmount();
      done();
    });
  });

  it('simulates click events', () => {
    const addWatcherSpy = jest.spyOn(Auction.prototype, 'addWatcher');
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.find('.add-watcher').simulate('click');
    auctionWrapper.update();
    expect(addWatcherSpy).toHaveBeenCalledTimes(1);
    auctionWrapper.unmount();
  });

  it('handles bid change', () => {
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper
      .find('.bid-input')
      .simulate('change', { target: { value: '200.00' } });
    expect(auctionWrapper.state('bidInput')).toEqual('200.00');
    auctionWrapper.unmount();
  });

  it('handles bid submit', () => {
    postBid.default = jest.fn(
      () =>
        new Promise(resolve => {
          resolve();
        }),
    );
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.setState({
      secondsLeft: 1000000,
      bidInput: '100.00',
      currentBid: '10.00',
    });
    auctionWrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    });
    expect(postBid.default).toHaveBeenCalledTimes(1);
    auctionWrapper.unmount();
  });

  it('throws error when user posts bid after bid close', () => {
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.setState({
      secondsLeft: 0,
      bidInput: '10.00',
      minimum: '1.00',
    });
    auctionWrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    });
    expect(auctionWrapper.state('alert')).toEqual('This auction has ended');
    auctionWrapper.unmount();
  });

  it('throws error when user posts invalid bid', () => {
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.setState({
      secondsLeft: 1000000,
      bidInput: '',
    });
    auctionWrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    });
    expect(auctionWrapper.state('alert')).toEqual(
      'Please enter a valid bid amount',
    );
    auctionWrapper.unmount();
  });

  it('throws error when user posts bid below the minimum', () => {
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.setState({
      secondsLeft: 1000000,
      bidInput: '10.00',
      minimum: '100.00',
    });
    auctionWrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    });
    expect(auctionWrapper.state('alert')).toEqual(
      'Invalid bid, your bid is below the minimum',
    );
    auctionWrapper.unmount();
  });

  it('throws error when user posts bid below the current bid', () => {
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.setState({
      secondsLeft: 1000000,
      bidInput: '10.00',
      currentBid: '100.00',
    });
    auctionWrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    });
    expect(auctionWrapper.state('alert')).toEqual(
      'Invalid bid, your bid is lower than the current bid',
    );
    auctionWrapper.unmount();
  });
});
