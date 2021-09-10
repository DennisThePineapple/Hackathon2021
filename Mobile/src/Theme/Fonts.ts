import styled from '@emotion/native';
import Colours from './Colours';

interface FontProps {
	colour?: string;
	bold?: boolean;
}

export const fontFamily = 'Comfortaa';
export const fontWeight = '600';
export const fontHeaderFamily = 'Comfortaa';
export const fontHeaderWeight = '900';

export const BodyFont = styled.Text<FontProps>`
	font-weight: ${({ bold }) => (bold ? fontHeaderWeight : fontWeight)};
	font-family: ${fontFamily};
	font-size: 18px;
	color: ${props => props.colour ?? Colours.primary};
`;

export const TitleFont = styled.Text<FontProps>`
	font-family: ${fontHeaderFamily};
	font-weight: ${fontHeaderWeight};
	font-size: 30px;
	color: ${props => props.colour ?? Colours.primary};
`;

export const SubFont = styled(BodyFont)`
	color: ${Colours.Greys.GREY0};
	font-size: 14px;
`;

export const SubFontBold = styled(SubFont)`
	color: ${Colours.Greys.GREY0};
	font-weight: 900;
`;
