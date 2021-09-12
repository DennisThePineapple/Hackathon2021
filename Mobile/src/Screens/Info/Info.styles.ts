import styled from '@emotion/native';
import Colours from 'Theme/Colours';
import { TitleFont } from 'Theme/Fonts';

export const TitleContainer = styled.View`
	padding: 5px;
	flex-direction: row;
	align-items: center;
`;

export const Title = styled(TitleFont)`
	font-size: 36px;
`;

export const BackButton = styled.TouchableOpacity`
	padding: 10px;
	border-radius: 100px;
	margin-right: 10px;
	background-color: ${Colours.primary};
`;

export const BodyContainer = styled.View`
	flex: 1;
	padding: 20px;
`;

export const HeroImage = styled.Image`
	border-radius: 10px;
	width: 100%;
	height: 300px;
	margin-bottom: 20px;
`;

export const BinType = styled(TitleFont)`
	text-align: center;
	margin-top: 20px;
`;