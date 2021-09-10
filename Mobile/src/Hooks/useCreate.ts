import { useState, useCallback } from 'react';
import auth from '@react-native-firebase/auth';
import { Snack } from 'Components/Snack/Snack';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ValidAccount {
	name: boolean;
	email: boolean;
	password: boolean;
}

interface UseCreateAccount {
	loading: boolean;
	valid: ValidAccount;
	handleChange: (value: string, action: 'name' | 'email' | 'password') => void;
	handleCreate: () => Promise<void>;
}

const useCreate = (): UseCreateAccount => {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [valid, setValid] = useState<ValidAccount>({ name: false, email: false, password: false });

	const handleChange = useCallback(
		(value: string, action: 'name' | 'email' | 'password') => {
			switch (action) {
				case 'name':
					setName(value);
					setValid({ ...valid, name: value.length > 0 });
					break;
				case 'email':
					setEmail(value);
					setValid({ ...valid, email: emailRe.test(value) });
					break;
				case 'password':
					setPassword(value);
					setValid({ ...valid, password: value.length > 5 });
					break;
			}
		},
		[valid],
	);

	const handleCreate = useCallback(async () => {
		try {
			setLoading(true);
			await auth().createUserWithEmailAndPassword(email, password);
			await auth().currentUser?.updateProfile({ displayName: name });
		} catch (error) {
			error instanceof Error && Snack.error(error.message);
			setLoading(false);
		}
	}, [email, name, password]);

	return { loading, valid, handleChange, handleCreate };
};

export default useCreate;
