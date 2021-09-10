import { StackNavigationProp } from '@react-navigation/stack';

export type AuthParams = {
	Login: undefined;
	Create: undefined;
	Forgot: undefined;
};

// Auth Navigation Types
export type LoginNavProps = StackNavigationProp<AuthParams, 'Login'>;
export type CreateNavProps = StackNavigationProp<AuthParams, 'Create'>;
export type ForgotNavProps = StackNavigationProp<AuthParams, 'Forgot'>;
