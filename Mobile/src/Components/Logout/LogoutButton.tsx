import Icon from 'Components/Icon/Icon';
import { useUser } from 'Context/AppContext';
import React, { FC } from 'react';
import Auth from 'Reducers/AuthReducer';
import Colours from 'Theme/Colours';
import * as Styles from './LogoutButton.styles';

const LogoutButton: FC = () => {
	const [, dispatchUser] = useUser();

	return (
		<Styles.Button onPress={() => dispatchUser(Auth.actions.logout())}>
			<Icon family="fontawesome" name={'sign-out'} size={30} colour={Colours.accent} />
		</Styles.Button>
	);
};

export default LogoutButton;
