import API from 'API/API';
import { Stats } from 'API/Responses';
import { Snack } from 'Components/Snack/Snack';
import { useUser } from 'Context/AppContext';
import { useEffect, useState } from 'react';

interface UseStats {
	loading: boolean;
	stats: Stats | undefined;
}

const useStats = (): UseStats => {
	const [user] = useUser();
	const [loading, setLoading] = useState(true);
	const [stats, setStats] = useState<Stats>();

	useEffect(() => {
		(async () => {
			if (user) {
				try {
					const _stats = await API.stats(user.uid);
					setStats(_stats);
				} catch (error) {
					Snack.error('Could not load stats');
				}
			}
			setLoading(false);
		})();
	}, [user]);

	return { loading, stats };
};

export default useStats;
