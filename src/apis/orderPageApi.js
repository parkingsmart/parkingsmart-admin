import axios from './base';

const getAllOrders = (page) => {
  return axios.get('/api/orders',{
    params: {
      page: page
    }
  });
};

export default {
  getAllOrders
};