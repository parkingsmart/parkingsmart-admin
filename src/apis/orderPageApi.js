import axios from './base';

const getAllOrders = () => {
    return axios.get('http://localhost:8080/orders');
};

export default {
    getAllOrders
};