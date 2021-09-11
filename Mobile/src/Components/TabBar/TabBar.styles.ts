import styled from '@emotion/native';
import Colours from 'Theme/Colours';

export const Container = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background-color: ${Colours.accent};
	padding-bottom: 20px;
	border-radius: 20px 20px 0px 0px;
`;

export const IconButton = styled.TouchableOpacity`
	padding: 20px 12%;
`;

export const IconContainer = styled.View`
	border-radius: 200px;
`;

export const AddContainer = styled.View`
	justify-content: center;
	align-items: center;
	position: relative;
`;

const ButtonDimensions = '80px';
const WrapperDimensions = '95px';

export const AddWrapper = styled.View`
	bottom: -12.5px;
	position: absolute;
	background-color: ${Colours.primary};
	width: ${WrapperDimensions};
	height: ${WrapperDimensions};
	border-radius: ${WrapperDimensions};
`;

export const AddButton = styled.TouchableOpacity`
	bottom: -5px;
	position: absolute;
	overflow: hidden;
	justify-content: center;
	align-items: center;
	width: ${ButtonDimensions};
	height: ${ButtonDimensions};
	border-radius: ${ButtonDimensions};
`;
