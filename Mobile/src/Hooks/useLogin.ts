import auth from '@react-native-firebase/auth';
import { Snack } from 'Components/Snack/Snack';
import { useCallback, useMemo, useState } from 'react';

interface UseLogin {
	loading: boolean;
	valid: boolean;
	handleChange: (value: string, action: 'email' | 'password') => void;
	handleLogin: () => Promise<void>;
}

const useLogin = (): UseLogin => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const valid = useMemo(() => email.length > 0 && password.length > 0, [email, password]);

	const handleChange = useCallback((value: string, action: 'email' | 'password') => {
		switch (action) {
			case 'email':
				setEmail(value);
				break;
			case 'password':
				setPassword(value);
				break;
		}
	}, []);

	const handleLogin = useCallback(async () => {
		try {
			setLoading(true);
			await auth().signInWithEmailAndPassword(email, password);
		} catch (error) {
			error instanceof Error && Snack.error(error.message);
			setLoading(false);
		}
	}, [email, password]);

	return { loading, valid, handleChange, handleLogin };
};

export default useLogin;
