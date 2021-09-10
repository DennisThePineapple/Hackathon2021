import React, { FC } from 'react';
import { StyleSheet, TouchableOpacityProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colours from 'Theme/Colours';
import { BodyFont } from 'Theme/Fonts';
import * as Styles from './Button.styles';

interface ButtonProps extends TouchableOpacityProps {
	text: string;
	bold?: boolean;
	fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({ text, fullWidth, bold, ...rest }) => {
	return (
		<Styles.Base fullWidth={fullWidth} {...rest}>
			<LinearGradient
				style={[StyleSheet.absoluteFill]}
				colors={[Colours.secondary, Colours.green]}
				start={{ x: 0.3, y: 0 }}
				end={{ x: 1, y: 0 }}
			/>
			<BodyFont bold={bold} colour={Colours.primary}>
				{text}
			</BodyFont>
		</Styles.Base>
	);
};

export default Button;
