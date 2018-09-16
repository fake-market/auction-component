import axios from 'axios';

const postWatcher = props =>
  axios.post(`/api/auction/product`, {
    params: props,
  });

export default postWatcher;
