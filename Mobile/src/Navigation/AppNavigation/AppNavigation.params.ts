// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// export type AppParams = {
// 	Home: undefined;
// 	Scan: undefined;
// 	Profile: undefined;
// };

// // App Navigation Types
// export type HomeNavProps = NativeStackNavigationProp<AppParams, 'Home'>;
// export type SubmitNavProps = NativeStackNavigationProp<AppParams, 'Scan'>;
// export type NoticesNavProps = NativeStackNavigationProp<AppParams, 'Profile'>;

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AppParams = {
	Tabs: undefined;
	Scan: undefined;
	Info: undefined;
};

// App Navigation Types
export type TabNavProps = NativeStackNavigationProp<AppParams, 'Tabs'>;
export type ScanNavProps = NativeStackNavigationProp<AppParams, 'Scan'>;
export type InfoNavProps = NativeStackNavigationProp<AppParams, 'Info'>;
