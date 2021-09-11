import { NavigationContainer } from '@react-navigation/native';
import ToastConfig from 'Components/Toast/Toast';
import AppContextProvider from 'Context/AppContext';
import RootNavigation from 'Navigation/RootNavigation/RootNavigation';
import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { Theme } from 'Theme/Theme';

const App: FC = () => {
	return (
		<AppContextProvider>
			<StatusBar barStyle="dark-content" />
			<NavigationContainer theme={Theme}>
				<RootNavigation />
			</NavigationContainer>
			<Toast ref={ref => Toast.setRef(ref)} config={ToastConfig} />
		</AppContextProvider>
	);
};

export default App;
