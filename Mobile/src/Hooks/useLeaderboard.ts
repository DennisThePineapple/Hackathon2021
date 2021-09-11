import API from 'API/API';
import { LeaderboardUser } from 'API/Responses';
import { Snack } from 'Components/Snack/Snack';
import { useUser } from 'Context/AppContext';
import { useEffect, useState } from 'react';

interface UseLeaderboard {
	loading: boolean;
	leaderboard: LeaderboardUser[];
}

const useLeaderboard = (pastDays: number): UseLeaderboard => {
	const [user] = useUser();
	const [loading, setLoading] = useState(true);
	const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

	useEffect(() => {
		(async () => {
			if (user) {
				try {
					const _leaderboard = await API.leaderboards(pastDays);
					setLeaderboard(_leaderboard);
				} catch (error) {
					Snack.error('Could not load stats');
				}
			}
			setLoading(false);
		})();
	}, [pastDays, user]);

	return { loading, leaderboard };
};

export default useLeaderboard;
