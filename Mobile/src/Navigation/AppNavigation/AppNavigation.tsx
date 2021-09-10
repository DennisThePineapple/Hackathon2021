import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppParams } from './AppNavigation.params';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity } from 'react-native';
import { useUser } from 'Context/AppContext';
import Auth from 'Reducers/AuthReducer';

const AppStack = createNativeStackNavigator<AppParams>();

const Test: FC = () => {
	const [, dispatchUser] = useUser();

	return (
		<SafeAreaView>
			<TouchableOpacity onPress={() => dispatchUser(Auth.actions.logout())}>
				<Text>Logout</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const AppNavigation: FC = () => {
	return (
		<AppStack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
			<AppStack.Screen name="Tabs" component={Test} />
			<AppStack.Screen name="Scan" component={Test} />
		</AppStack.Navigator>
	);
};

export default AppNavigation;
