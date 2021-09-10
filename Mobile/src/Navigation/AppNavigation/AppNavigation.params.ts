import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AppParams = {
	Home: undefined;
	Scan: undefined;
	Profile: undefined;
};

// App Navigation Types
export type HomeNavProps = NativeStackNavigationProp<AppParams, 'Home'>;
export type SubmitNavProps = NativeStackNavigationProp<AppParams, 'Scan'>;
export type NoticesNavProps = NativeStackNavigationProp<AppParams, 'Profile'>;
