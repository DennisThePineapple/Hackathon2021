import React, { FC } from 'react';
import { RootParams } from './RootNavigation.params';
import AuthNavigation from 'Navigation/AuthNavigation/AuthNavigation';
import { useUser } from 'Context/AppContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigation from 'Navigation/AppNavigation/AppNavigation';

const RootStack = createNativeStackNavigator<RootParams>();

const RootNavigation: FC = () => {
	const [user] = useUser();

	return (
		<RootStack.Navigator screenOptions={{ headerShown: false }}>
			{user ? (
				<RootStack.Screen name="App" component={AppNavigation} />
			) : (
				<RootStack.Screen name="Auth" component={AuthNavigation} />
			)}
		</RootStack.Navigator>
	);
};

export default RootNavigation;
