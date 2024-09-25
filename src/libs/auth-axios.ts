import axios from 'axios';

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosAuthInstance = axios.create(axiosConfig);

export default axiosAuthInstance;
