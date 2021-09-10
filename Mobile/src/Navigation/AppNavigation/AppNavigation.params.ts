import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AppParams = {
	Tabs: undefined;
	Scan: undefined;
	Info: undefined;
};

// App Navigation Types
export type TabNavProps = NativeStackNavigationProp<AppParams, 'Tabs'>;
export type SubmitNavProps = NativeStackNavigationProp<AppParams, 'Scan'>;
export type NoticesNavProps = NativeStackNavigationProp<AppParams, 'Info'>;
