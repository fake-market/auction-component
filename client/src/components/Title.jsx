import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './Title.css';
import getProductInfo from '../services/getProductInfo';

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.fetchName = this.fetchName.bind(this);
  }

  componentDidMount() {
    this.fetchName();
  }

  fetchName() {
    const { id } = this.props;
    getProductInfo({ id }).then(({ data }) => {
      this.setState({
        name: data.name,
      });
    });
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <div styleName="item-text">{name}</div>
        <hr />
      </div>
    );
  }
}

Title.propTypes = {
  id: PropTypes.number.isRequired,
};

export default CSSModules(Title, styles);
