import { useUser } from 'Context/AppContext';
import React, { FC } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import Auth from 'Reducers/AuthReducer';

const Profile: FC = () => {
	const [, dispatchUser] = useUser();
	return (
		<SafeAreaView>
			<TouchableOpacity onPress={() => dispatchUser(Auth.actions.logout())}>
				<Text>Logout</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default Profile;
