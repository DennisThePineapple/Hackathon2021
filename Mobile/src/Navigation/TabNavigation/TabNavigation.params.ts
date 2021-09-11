import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type TabParams = {
	Leaderboard: undefined;
	Profile: undefined;
};

// App Navigation Types
export type LeaderboardNavProps = BottomTabNavigationProp<TabParams, 'Leaderboard'>;
export type ProfileNavProps = BottomTabNavigationProp<TabParams, 'Profile'>;
