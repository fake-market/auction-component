import axios from 'axios';

const getBids = props =>
  axios.get(`/api/auction/bid`, {
    params: props,
  });

export default getBids;
