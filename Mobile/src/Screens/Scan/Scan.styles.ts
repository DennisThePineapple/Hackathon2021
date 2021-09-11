import styled from '@emotion/native';
import { RNCamera } from 'react-native-camera';
import Colours from 'Theme/Colours';
import { SubFont } from 'Theme/Fonts';

export const BackContainer = styled.View`
	z-index: 999;
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
`;

export const CaptureContainer = styled.View`
	z-index: 999;
	position: absolute;
	width: 100%;
	bottom: 50px;
	height: 120px;
	align-items: center;
`;

const captureButtonDimensions = '80px';

export const CaptureButton = styled.TouchableOpacity`
	width: ${captureButtonDimensions};
	height: ${captureButtonDimensions};
	border-radius: ${captureButtonDimensions};
	border: 5px solid #fff;
`;

interface BoundingBoxProps {
	colour: string;
	top: number;
	left: number;
	right: number;
	bottom: number;
}

export const BoundingBox = styled.TouchableOpacity<BoundingBoxProps>`
	position: absolute;
	border-color: ${({ colour }) => colour};
	border-radius: 0px 10px 10px 10px;
	border-width: 3px;
	top: ${({ top }) => top + 'px'};
	left: ${({ left }) => left + 'px'};
	right: ${({ right }) => right + 'px'};
	bottom: ${({ bottom }) => bottom + 'px'};
`;

interface BoundingBoxLabelProps {
	colour: string;
}

export const BoundingBoxLabel = styled.View<BoundingBoxLabelProps>`
	padding: 5px;
	align-items: center;
	justify-content: center;
	border-radius: 5px 5px 0px 0px;
	position: absolute;
	top: -20px;
	left: -3px;
	background-color: ${({ colour }) => colour};
`;

export const BoundingBoxFont = styled(SubFont)`
	font-size: 10px;
`;
