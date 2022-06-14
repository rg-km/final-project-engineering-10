import axios from 'axios';

const axiosConfig = axios.create({});

axiosConfig.defaults.headers.common['Accept'] = 'application/json';
axiosConfig.defaults.headers.common['Content-Type'] = 'application/json';

if (typeof window !== 'undefined') {
	const token = localStorage.getItem('token_pencaker');
	axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosConfig;
