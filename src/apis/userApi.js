import axios from './base.js';

const baseUrl = '/api/employees';

const fetchUsers = async () => {
  return axios.get(baseUrl);
};

const addUser = (user) => {
  return axios.post(baseUrl, user);
};

const editCareer = async (id,user) => {
  return axios.put(`${baseUrl}/${id}`,user);
};

const getParkingBoyPage = (page, pageSize = 10) => {
  return axios.get(baseUrl, {
    params: {
      page,
      pageSize,
      officeId: 0
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
  editCareer,
  getParkingBoyPage,
  getParkingLotsByUserId,
  appointParkingLots,
  leavingParkingLots
};
