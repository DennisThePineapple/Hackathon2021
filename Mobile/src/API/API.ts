import axiosInstance from './APIService';
import axios from 'axios';
import Config from 'react-native-config';
import { Boundings, LeaderboardUser, Stats, Submission } from './Responses';

/**
 * Submits an image to the model for inferencing
 * @param file Image taken on the device
 * @param userId Current user UID
 * @param userName Name of the current user
 */
const submit = async (file: string, userId: string, userName: string | null): Promise<Submission> => {
	const formData = new FormData();
	formData.append('file', { uri: file, name: 'picture.jpg', type: 'image/jpg' });
	formData.append('userId', userId);
	formData.append('username', userName);

	const response = await axios.post<Submission>(`${Config.API_HOST}/submit`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

	return response.data;
};

/**
 * Gets a list of leaderboard users within a given date range
 * @param pastDays the start date for the date range
 * @returns a list of users, their scores, and the materials they have scanned
 */
const leaderboards = async (pastDays: number): Promise<LeaderboardUser[]> => {
	const response = await axiosInstance.get<LeaderboardUser[]>(`/leaderboards?past_days=${pastDays}`);
	return response.data;
};

/**
 * Get the statistics for a user
 * @param userId the user in which we wish to obtain statistics for
 * @returns Statistics for the week, month, year and all time for a given user
 */
const stats = async (userId: string): Promise<Stats> => {
	const response = await axiosInstance.get<Stats>(`/user_stats?userId=${userId}`);
	return response.data;
};

const API = { submit, leaderboards, stats };

export default API;
