import styled from '@emotion/native';
import Colours from 'Theme/Colours';

export const BackContainer = styled.View`
	position: absolute;
	justify-content: center;
	align-items: center;
	left: 15px;
	top: 15px;
`;

export const BackButton = styled.TouchableOpacity`
	padding: 10px;
	border-radius: 100px;
	background-color: ${Colours.primary};
    z-index: 100;
`;
