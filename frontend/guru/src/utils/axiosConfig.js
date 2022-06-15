import axios from 'axios';

const axiosConfig = axios.create({});

// axiosConfig.defaults.headers.common['Accept'] = 'application/json';
// axiosConfig.defaults.headers.common['Content-Type'] = 'application/json';
axiosConfig.defaults.withCredentials = true;

export default axiosConfig;
