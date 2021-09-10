import styled from '@emotion/native';
import Colours from 'Theme/Colours';

interface ButtonProps {
	fullWidth?: boolean;
}

export const Base = styled.TouchableOpacity<ButtonProps>`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	padding: 0px 20px;
	border-radius: 200px;
	height: 60px;
	background-color: ${Colours.secondary};
	${({ fullWidth }) => (fullWidth ? 'width: 100%' : '')};
`;
