import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParams } from './AppNavigation.params';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity } from 'react-native';
import { useUser } from 'Context/AppContext';
import Auth from 'Reducers/AuthReducer';
import Scan from "../../Screens/Scan/Scan";
import Profile from "../../Screens/Profile/Profile";
import Home from "../../Screens/Home/Home";




const AppNavigation: FC = () => {
	const Tab = createBottomTabNavigator<AppParams>();
	return (
		<Tab.Navigator initialRouteName = "Home">
			<Tab.Screen name="Scan" component={Scan} />
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
};

export default AppNavigation;

