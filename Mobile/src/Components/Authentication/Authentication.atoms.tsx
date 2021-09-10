import { useNavigation } from '@react-navigation/core';
import Icon from 'Components/Icon/Icon';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Colours from 'Theme/Colours';

export const Check: FC = () => <Icon family="fontawesome" name="check" size={20} colour={Colours.secondary} />;

interface EyeProps {
	open: boolean;
	onPress: () => void;
}

export const Eye: FC<EyeProps> = ({ open, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<Icon
			family="feather"
			name={open ? 'eye' : 'eye-off'}
			size={20}
			colour={Colours.primary}
			style={{ marginLeft: 10 }}
		/>
	</TouchableOpacity>
);

export const Back: FC = () => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity onPress={() => navigation.goBack()}>
			<Icon family="feather" name={'chevron-left'} size={35} colour={Colours.secondary} />
		</TouchableOpacity>
	);
};
