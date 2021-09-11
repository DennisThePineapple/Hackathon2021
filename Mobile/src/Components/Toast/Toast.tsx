import React from 'react';
import { BaseToastProps } from 'react-native-toast-message';
import Colours from 'Theme/Colours';
import * as Styles from './Toast.styles';

export const ToastConfig = {
	success: ({ text1, ...rest }: BaseToastProps) => (
		<Styles.Container colour={Colours.accent}>
			<Styles.Highlight colour={Colours.secondary} />
			<Styles.Text colour={Colours.primary}>{text1}</Styles.Text>
		</Styles.Container>
	),
	error: ({ text1, ...rest }: BaseToastProps) => (
		<Styles.Container colour={Colours.accent}>
			<Styles.Highlight colour={Colours.red} />
			<Styles.Text colour={Colours.primary}>{text1}</Styles.Text>
		</Styles.Container>
	),
};

export default ToastConfig;
