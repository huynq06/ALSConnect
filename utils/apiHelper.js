import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://10.10.1.11:3434',
  withCredentials: true
});

export default axiosInstance;
