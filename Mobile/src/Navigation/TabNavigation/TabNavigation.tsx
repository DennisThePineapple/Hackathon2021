import React, { FC, Fragment } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParams } from './TabNavigation.params';
import Profile from 'Screens/Profile/Profile';
import Home from 'Screens/Home/Home';
import { fontHeaderFamily } from 'Theme/Fonts';
import TabBar from 'Components/TabBar/TabBar';
import { Text } from 'react-native';
import { useUser } from 'Context/AppContext';
import Auth from 'Reducers/AuthReducer';
import LogoutButton from 'Components/Logout/LogoutButton';

const Tab = createBottomTabNavigator<TabParams>();

const TabNavigation: FC = () => {
	return (
		<Tab.Navigator
			tabBar={TabBar}
			screenOptions={{
				headerTitleAlign: 'left',
				headerTitleStyle: { fontFamily: fontHeaderFamily, fontSize: 36 },
				headerStatusBarHeight: 60,
				headerBackground: () => <Fragment />,
				headerRight: () => <LogoutButton />,
			}}
		>
			<Tab.Screen name="Profile" component={Profile} />
			<Tab.Screen name="Leaderboard" component={Home} />
		</Tab.Navigator>
	);
};

export default TabNavigation;
