import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';

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
