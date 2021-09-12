import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppParams } from './AppNavigation.params';
import Scan from 'Screens/Scan/Scan';
import TabNavigation from 'Navigation/TabNavigation/TabNavigation';
import Info from 'Screens/Info/Info';
import { fontHeaderFamily } from 'Theme/Fonts';

const AppStack = createNativeStackNavigator<AppParams>();

const AppNavigation: FC = () => {
	return (
		<AppStack.Navigator screenOptions={{ headerShown: false, presentation: 'fullScreenModal' }}>
			<AppStack.Screen name="Tabs" component={TabNavigation} />
			<AppStack.Screen name="Scan" component={Scan} />
			<AppStack.Screen
				name="Info"
				component={Info}
				// options={{
				// 	headerShown: true,
				// 	headerTitleAlign: 'left',
				// 	headerTitleStyle: { fontFamily: fontHeaderFamily, fontSize: 26 },
				// 	// headerB
				// 	// he: 60,
				// 	// headerBackground: () => <Fragment />,
				// 	// headerRight: () => <LogoutButton />,
				// }}
			/>
		</AppStack.Navigator>
	);
};

export default AppNavigation;
