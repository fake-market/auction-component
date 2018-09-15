import React from 'react';
import ReactDOM from 'react-dom';
import Auction from './components/Auction';
import Title from './components/Title';

ReactDOM.render(<Title />, document.getElementById('title'));
ReactDOM.render(<Auction />, document.getElementById('auction'));
