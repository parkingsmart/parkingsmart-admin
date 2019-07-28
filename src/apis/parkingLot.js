import axios from './base.js';

const getAll = (page) => {
  return axios.get('/api/parking-lots',{
    params:{
      page:page
    }
  });
};

const putAParkingLot = (id,data) => {
  return axios.put('/api/parking-lots/' + id,data);
};

const postAParkingLot = (data) => {
  return axios.post('/api/parking-lots/' ,data);
};
export default {
  getAll,
  putAParkingLot,
  postAParkingLot
};