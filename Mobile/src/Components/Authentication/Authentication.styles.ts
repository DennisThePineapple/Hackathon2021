import styled from '@emotion/native';
import Button from 'Components/Button/Button';
import Icon from 'Components/Icon/Icon';
import Colours from 'Theme/Colours';
import { fontFamily, fontWeight } from 'Theme/Fonts';

export const Container = styled.View`
	flex: 1;
	align-items: center;
	padding: 20px;
`;

export const BackContainer = styled.View`
	position: absolute;
	left: 15px;
	top: 15px;
`;

/* -------------------------------------------------------------------------- */
/*                                    Title                                   */
/* -------------------------------------------------------------------------- */
export const TitleContainer = styled.View`
	flex-direction: row;
	align-items: center;
	margin: 60px;
`;

export const TitleIcon = styled(Icon)`
	margin-right: 8px;
`;

/* -------------------------------------------------------------------------- */
/*                                    Input                                   */
/* -------------------------------------------------------------------------- */
export const InputContainer = styled.View`
	justify-content: center;
	width: 100%;
	height: 55px;
	padding: 0px 20px;
	border-radius: 10px;
	margin-bottom: 20px;
	background-color: ${Colours.Greys.GREY0};
`;

export const Input = styled.TextInput`
	flex: 1;
	font-weight: ${fontWeight};
	font-family: ${fontFamily};
	font-size: 16px;
	color: ${Colours.primary};
`;

/* -------------------------------------------------------------------------- */
/*                                    Icon                                    */
/* -------------------------------------------------------------------------- */
export const IconContainer = styled.View`
	flex-direction: row;
	position: absolute;
	right: 20px;
`;

/* -------------------------------------------------------------------------- */
/*                                   Button                                   */
/* -------------------------------------------------------------------------- */
export const AuthButton = styled(Button)`
	margin-top: 20px;
`;

export const LoginButton = styled.TouchableOpacity`
	padding: 10px;
	margin-top: auto;
	flex-direction: row;
	align-items: center;
`;
