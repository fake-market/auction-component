import axios from 'axios';

const getBids = props =>
  axios.get(`${process.env.URL}/api/auction/bid`, {
    params: props,
  });

export default getBids;
