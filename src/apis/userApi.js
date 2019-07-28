import axios from './base.js';
const baseUrl = 'http://localhost:8080/users';

const instance = axios.create({});

const fetchUsers = async () => {
  const response = await instance.get(baseUrl);
  return response.data;
};
const addUser = async (user) => {
  await axios.post(baseUrl, user);
};
export default {
  fetchUsers,
  addUser
};
