import axios from './base.js';

const baseUrl = 'http://localhost:8080/users';

const fetchUsers = async () => {
  return axios.get(baseUrl);
};

const addUser = async (user) => {
  await axios.post(baseUrl, user);
};

export default {
  fetchUsers,
  addUser
};
