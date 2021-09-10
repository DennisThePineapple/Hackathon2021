import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

/* Authentication state */
export type AuthState = FirebaseAuthTypes.User | null;

/* Reducer action types */
export type AuthAction =
	| {
			type: 'LOGIN';
			payload: FirebaseAuthTypes.User;
	  }
	| {
			type: 'LOGOUT';
	  };

/* Reducer actions */
export const actions = {
	login: (user: FirebaseAuthTypes.User): AuthAction => ({ type: 'LOGIN', payload: user }),
	logout: (): AuthAction => ({ type: 'LOGOUT' }),
};

/* Authentication reducer */
const reducer = (state: FirebaseAuthTypes.User | null, action: AuthAction): AuthState => {
	switch (action.type) {
		case 'LOGIN':
			console.log(`Logging in as ${action.payload.email}`);
			return action.payload;
		case 'LOGOUT':
			auth().signOut();
			console.log(`Logging out of ${state?.email}`);
			return null;
		default:
			return state;
	}
};

/* Reducer object */
const Auth = {
	actions,
	reducer,
};

export default Auth;
