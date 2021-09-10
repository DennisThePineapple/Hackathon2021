import { NavigationContainer } from '@react-navigation/native';
import AppContextProvider from 'Context/AppContext';
import RootNavigation from 'Navigation/RootNavigation/RootNavigation';
import React, { FC } from 'react';

const App: FC = () => {
	return (
		<AppContextProvider>
			<NavigationContainer>
				<RootNavigation />
			</NavigationContainer>
		</AppContextProvider>
	);
};

export default App;
