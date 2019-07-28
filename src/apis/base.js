import axios from 'axios';

const baseUrl = 'http://localhost:8880/users';

const instance = axios.create({});
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});
const fetchUsers = async () => {
  const response = await instance.get(baseUrl);
  return response.data;
};
const addUser = async (user) => {
  await instance.post(baseUrl, user);
};
export default {
  fetchUsers,
  addUser
};
