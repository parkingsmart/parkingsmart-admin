import axios from './base';

const getAllOrders = (page) => {
    return axios.get('http://localhost:8080/orders',{
        params: {
        page: page
      }
    });
};

export default {
    getAllOrders
};