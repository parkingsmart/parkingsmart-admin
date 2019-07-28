import axios from './base';

const getAllOrders = (page) => {
    return axios.get('http://localhost:8082/orders',{
        params: {
        page: page
      }
    });
};

export default {
    getAllOrders
};