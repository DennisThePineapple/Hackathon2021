import { Dispatch, useEffect, useReducer, useState } from 'react';
import auth from '@react-native-firebase/auth';
import Auth, { AuthAction, AuthState } from 'Reducers/AuthReducer';

interface UseAuth {
	loading: boolean;
	user: AuthState;
	dispatchUser: Dispatch<AuthAction>;
}

// Checks if the user is authenticated
const useAuth = (): UseAuth => {
	const [loading, setLoading] = useState<boolean>(true);
	const [user, dispatchUser] = useReducer(Auth.reducer, null);

	useEffect(() => {
		const authListener = auth().onAuthStateChanged(_user => {
			_user && dispatchUser(Auth.actions.login(_user));
			setLoading(false);
		});
		return authListener;
	}, []);

	return { loading, user, dispatchUser };
};

export default useAuth;
