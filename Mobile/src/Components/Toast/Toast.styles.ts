import styled from '@emotion/native';
import { fontFamily } from 'Theme/Fonts';

interface ToastContainerProps {
	colour: string;
}

export const Container = styled.View<ToastContainerProps>`
	position: relative;
	overflow: hidden;
	width: 90%;
	border-radius: 10px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: ${({ colour }) => colour};
`;

export const Highlight = styled.View<ToastContainerProps>`
	background-color: ${({ colour }) => colour};
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 15px;
`;

export const Text = styled.Text<ToastContainerProps>`
	font-weight: 600;
	font-family: ${fontFamily};
	color: ${({ colour }) => colour};
	padding: 10px;
	padding-left: 20px;
`;
