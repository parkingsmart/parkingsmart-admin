import axios from './base.js';

const getByPage = (page) => {
  return axios.get('/api/parking-lots', {
    params: {
      page: page
    }
  });
};

const getAll = () => {
  return axios.get('/api/parking-lots');
};
const putAParkingLot = (id, data) => {
  return axios.put('/api/parking-lots/' + id, data);
};

const postAParkingLot = (data) => {
  return axios.post('/api/parking-lots/', data);
};
export default {
  getAll,
  putAParkingLot,
  postAParkingLot,
  getByPage
};