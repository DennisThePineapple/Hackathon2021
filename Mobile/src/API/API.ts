import axiosInstance from './APIService';
import axios from 'axios';
import Config from 'react-native-config';

/**
 * Submits an image to the model for inferencing
 * @param file Image taken on the device
 * @param userId Current user UID
 * @param userName Name of the current user
 */
const submit = async (file: string, userId: string, userName: string | null): Promise<void> => {
	const formData = new FormData();

	formData.append('file', { uri: file, name: 'picture.jpg', type: 'image/jpg' });
	formData.append('userId', userId);
	formData.append('username', userName);

	const response = await axios.post(`${Config.API_HOST}/submit`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

	console.log(response.data);
};

const leaderboards = async (pastDays: number): Promise<void> => {
	const response = await axiosInstance.get(`/leaderboards?past_days=${pastDays}`);
	console.log(response);
};

const API = { submit, leaderboards };

export default API;
