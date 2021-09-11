import styled from '@emotion/native';
import Colours from 'Theme/Colours';
import { BodyFont, SubFont, TitleFont } from 'Theme/Fonts';

export const Container = styled.View`
	flex: 1;
	padding: 18px;
`;

export const TopContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin: 50px 20px 60px 20px;
`;

const iconDimensions = '70px';

interface TopIconProps {
	best?: boolean;
}

export const TopIcon = styled.View<TopIconProps>`
	align-items: center;
	justify-content: center;
	width: ${iconDimensions};
	height: ${iconDimensions};
	border-radius: 200px;
	border-width: 3px;
	border-color: ${Colours.accent};
	margin-top: ${({ best }) => (best ? '-10px' : '0px')};
`;

export const TopElement = styled.View`
	position: absolute;
	top: -22px;
`;

export const BottomElement = styled.View`
	position: absolute;
	align-items: center;
	bottom: -40px;
	width: 200px;
`;

export const BottomFont = styled(SubFont)`
	text-align: center;
`;

export const TopFont = styled(TitleFont)`
	font-size: 40px;
	color: ${Colours.accent};
`;
