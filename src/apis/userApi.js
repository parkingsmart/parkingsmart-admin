import axios from './base.js';

const baseUrl = 'http://localhost:8080/users';

const fetchUsers = async () => {
  return axios.get(baseUrl);
};

const addUser = (user) => {
  return axios.post(baseUrl, user);
};

export default {
  fetchUsers,
  addUser
};
