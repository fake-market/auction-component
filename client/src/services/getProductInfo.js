import axios from 'axios';

const getProductInfo = props =>
  axios.get(`/api/auction/product`, {
    params: props,
  });

export default getProductInfo;
