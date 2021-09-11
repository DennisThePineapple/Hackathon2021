import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParams } from './AppNavigation.params';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity } from 'react-native';
import { useUser } from 'Context/AppContext';
import Auth from 'Reducers/AuthReducer';
import Scan from 'Screens/Scan/Scan';
import Profile from 'Screens/Profile/Profile';
import Home from 'Screens/Home/Home';
import TabNavigation from 'Navigation/TabNavigation/TabNavigation';

// const Tab = createBottomTabNavigator<AppParams>();

const AppStack = createNativeStackNavigator<AppParams>();

const AppNavigation: FC = () => {
	return (
		<AppStack.Navigator screenOptions={{ headerShown: false, presentation: 'fullScreenModal' }}>
			<AppStack.Screen name="Tabs" component={TabNavigation} />
			<AppStack.Screen name="Scan" component={Scan} />
		</AppStack.Navigator>
	);
};

export default AppNavigation;
