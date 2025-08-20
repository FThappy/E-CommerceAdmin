import axios from 'axios';

const BASE_URL = 'https://e-commercebackend-es17.onrender.com/api/';

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const userRequest = axios.create({
  baseURL: BASE_URL
});
userRequest.interceptors.request.use(request => requestHandler(request));
const requestHandler = async request => {
  const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).currentUser)?.accessToken;
  if (token) {
    request.headers.token = `Bearer ${token}`;
  }
  return request;
};
