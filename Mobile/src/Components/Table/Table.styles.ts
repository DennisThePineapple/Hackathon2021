import styled from '@emotion/native';
import Colours from 'Theme/Colours';

interface TableRowProps {
	header?: boolean;
}

export const TabelRow = styled.View<TableRowProps>`
	flex-direction: row;
	background-color: ${({ header }) => (header ? Colours.accent : Colours.primary)};
	border-radius: ${({ header }) => (header ? '10px' : '0px')};
	border-bottom-width: 1px;
	margin: 2px;
	padding: 10px;
	border-bottom-color: ${Colours.accent};
`;

interface TableCellProps {
	flex: number;
	align?: 'center' | 'flex-start' | 'flex-end';
}

export const TableCell = styled.View<TableCellProps>`
	flex-direction: row;
	justify-content: ${({ align }) => align ?? 'flex-start'};
	align-items: center;

	flex: ${({ flex }) => flex};
`;
