import styled from '@emotion/native';
import Colours from 'Theme/Colours';
import { BodyFont } from 'Theme/Fonts';

export const Container = styled.View`
	padding: 18px;
	flex: 1;
`;

export const FontContainer = styled.View`
	margin-bottom: 10px;
`;

export const Font = styled(BodyFont)`
	margin-bottom: 20px;
`;

export const LogoutButton = styled.TouchableOpacity`
	background-color: ${Colours.secondary};
	padding: 20px;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
`;

export const TableContainer = styled.View`
	margin: 20px 0px;
	flex: 1;
`;
