import { DefaultTheme, Theme as NavTheme } from '@react-navigation/native';
import Colours from './Colours';

export const Theme: NavTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: Colours.primary,
		text: Colours.Greys.GREY0,
	},
};
