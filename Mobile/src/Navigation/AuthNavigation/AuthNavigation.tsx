import React from 'react';
import ForgotScreen from 'Screens/Forgot/ForgotScreen';
import LoginScreen from 'Screens/Login/LoginScreen';
import CreateScreen from 'Screens/Create/CreateScreen';
import { AuthParams } from './AuthNavigation.params';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator<AuthParams>();

const AuthNavigation: React.FC = () => {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }}>
			<AuthStack.Screen name="Create" component={CreateScreen} />
			<AuthStack.Screen name="Login" component={LoginScreen} />
			<AuthStack.Screen name="Forgot" component={ForgotScreen} />
		</AuthStack.Navigator>
	);
};

export default AuthNavigation;
