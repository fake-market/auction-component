import React from 'react';
import { shallow, mount } from 'enzyme';
import Auction from '../client/src/components/Auction';

jest.mock('../client/src/services/getProductInfo');
jest.mock('../client/src/services/getBids');
jest.mock('../client/src/services/postBid');

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
      auctionWrapper.update();
      const state = auctionWrapper.instance().state;
      expect(state.name).toEqual('sampleProduct');
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
      const state = auctionWrapper.instance().state;
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

  it('simulates click events', done => {
    const addWatcherSpy = jest.spyOn(Auction.prototype, 'addWatcher');
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.find('.add-watcher').simulate('click');

    setTimeout(() => {
      auctionWrapper.update();
      expect(addWatcherSpy).toHaveBeenCalledTimes(1);
      auctionWrapper.unmount();
      done();
    });
  });

  it('handles bid change', done => {
    const auctionWrapper = shallow(<Auction />);

    setTimeout(() => {
      auctionWrapper.update();
      auctionWrapper
        .find('.bid-input')
        .simulate('change', { target: { value: '200.00' } });
      const state = auctionWrapper.instance().state;
      expect(state.bidInput).toEqual('200.00');
      auctionWrapper.unmount();
      done();
    });
  });

  it('handles bid submit', done => {
    const fetchBidsSpy = jest.spyOn(Auction.prototype, 'fetchBids');
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.find('.place-bid').simulate('click');

    setTimeout(() => {
      auctionWrapper.update();
      expect(fetchBidsSpy).toHaveBeenCalledTimes(1);
      auctionWrapper.unmount();
      done();
    });
  });

  it('handles adding to watchlist', done => {
    const fetchProductInfoSpy = jest.spyOn(
      Auction.prototype,
      'fetchProductInfo',
    );
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.find('.add-watcher').simulate('click');

    setTimeout(() => {
      auctionWrapper.update();
      expect(fetchProductInfoSpy).toHaveBeenCalledTimes(1);
      auctionWrapper.unmount();
      done();
    });
  });

  it('throws error when user posts bid after bid close', done => {
    window.alert = jest.fn();
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.setState({ secondsLeft: 0 });

    setTimeout(() => {
      auctionWrapper.update();
      auctionWrapper.instance().handleBidSubmit();
      expect(window.alert).toHaveBeenCalled();
      auctionWrapper.unmount();
      done();
    });
  });

  it('throws error when user posts invalid bid', done => {
    window.alert = jest.fn();
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.setState({ bidInput: 'nonsense' });

    setTimeout(() => {
      auctionWrapper.update();
      auctionWrapper.instance().handleBidSubmit();
      expect(window.alert).toHaveBeenCalled();
      auctionWrapper.unmount();
      done();
    });
  });

  it('throws error when user posts bid below the minimum', done => {
    window.alert = jest.fn();
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.setState({ bidInput: '1' });

    setTimeout(() => {
      auctionWrapper.update();
      auctionWrapper.instance().handleBidSubmit();
      expect(window.alert).toHaveBeenCalled();
      auctionWrapper.unmount();
      done();
    });
  });

  it('throws error when user posts bid below the current bid', done => {
    window.alert = jest.fn();
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.setState({ bidInput: '50' });

    setTimeout(() => {
      auctionWrapper.update();
      auctionWrapper.instance().handleBidSubmit();
      expect(window.alert).toHaveBeenCalled();
      auctionWrapper.unmount();
      done();
    });
  });
});
