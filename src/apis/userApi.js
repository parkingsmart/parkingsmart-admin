import axios from './base.js';

const baseUrl = 'http://localhost:8080/users';

const fetchUsers = async () => {
  return axios.get(baseUrl);
};

const addUser = async (user) => {
  await axios.post(baseUrl, user);
};

const getPage = (page, pageSize = 10) => {
  return axios.get(baseUrl, {
    params: {
      page,
      pageSize
    }
  });
};

const getParkingLotsByUserId = (id) => {
  return axios.get(`${baseUrl}/${id}/parking-lots`);
};

const appointParkingLots = (id, ids) => {
  return axios.post(`${baseUrl}/${id}/parking-lots/appointments`, ids);
};

const leavingParkingLots = (id, ids) => {
  return axios.post(`${baseUrl}/${id}/parking-lots/leaving`, ids);
};

export default {
  fetchUsers,
  addUser,
  getPage,
  getParkingLotsByUserId,
  appointParkingLots,
  leavingParkingLots
};
