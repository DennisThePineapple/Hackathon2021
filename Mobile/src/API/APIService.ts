import axios from 'axios';
import Config from 'react-native-config';

/**
 *  Axios instance that points to the API_HOST in .env (see .env.example)
 *  This instance uses an interceptor https://github.com/axios/axios#interceptors
 *  to append an auth token to each request
 */
const axiosInstance = axios.create({
	baseURL: Config.API_HOST,
	responseType: 'json',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axiosInstance;
