import React, { FC, Fragment } from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TabParams } from './TabNavigation.params';
import Profile from 'Screens/Profile/Profile';
import Home from 'Screens/Home/Home';
import { fontHeaderFamily } from 'Theme/Fonts';
// import HomeScreen from 'Screens/Home/HomeScreen';
import { View, Text } from 'react-native';
// import Colours from 'Theme/Colours';
// import { fontFamily, TitleFont } from 'Theme/Fonts';
// import Responsive from 'Utils/Responsive';
// import ProfileScreen from 'Screens/Profile/ProfileScreen';
import TabBar from 'Components/TabBar/TabBar';

const Tab = createBottomTabNavigator<TabParams>();

const TabNavigation: FC = () => {
	return (
		<Tab.Navigator
			tabBar={TabBar}
			screenOptions={{
				headerTitleAlign: 'left',
				headerTitleStyle: { fontFamily: fontHeaderFamily, fontSize: 30 },
				// headerStatusBarHeight: Responsive.h(8),
				headerBackground: () => <Fragment />,
			}}
		>
			<Tab.Screen name="Leaderboard" component={Home} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
};

export default TabNavigation;
