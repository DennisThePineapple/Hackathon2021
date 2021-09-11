import React, { FC, useEffect, useState } from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import Userscore from '../../Types/Userscore';
import { DataTable } from 'react-native-paper';
import {getRecPoints, getWastePoints} from "../../Utils/Points";

const optionsPerPage = [2, 3, 4];
type scoreTableProps = {
	time: string;
};
// Tf is this lmao
const ScoresTable: (props: scoreTableProps) => JSX.Element = (props: scoreTableProps) => {
	const [loading, setLoading] = useState(true);
	const [scoreData, setScoreData] = useState(new Array<Userscore>());
	const [page, setPage] = React.useState<number>(0);
	const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
	const url = 'http://192.168.0.37:5000/api/leaderboards?days=' + props.time;
	const fetchData = () => {
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: "application/json"
			},
		})
			.then(response => response.json())
			.then(scoreData => {
				setScoreData(scoreData);
				setLoading(false);
			})
			.catch(error => {
				console.log(error);
			});
	}
	useEffect(() => {
		console.log("Loading score data");
		fetchData();
	}, []);

	const userScores = () => {
		let index = 1;
		const test = Object.keys(scoreData);
		return Object.keys(scoreData).map(username => (
			<DataTable.Row key = {index}>
				<DataTable.Cell numeric>{index++}</DataTable.Cell>
				<DataTable.Cell>{username}</DataTable.Cell>
				<DataTable.Cell numeric>{scoreData[username].total}</DataTable.Cell>
				<DataTable.Cell numeric>{getRecPoints(scoreData[username])}</DataTable.Cell>
				<DataTable.Cell numeric>{getWastePoints(scoreData[username])}</DataTable.Cell>
			</DataTable.Row>
		));
	};
	return (

		<SafeAreaView>
			<Button title="Refresh" onPress={fetchData} />
			<DataTable>
				<DataTable.Header>
					<DataTable.Title numeric>Ranking</DataTable.Title>
					<DataTable.Title>Name</DataTable.Title>
					<DataTable.Title numeric>Points</DataTable.Title>
					<DataTable.Title numeric>Recycle Points</DataTable.Title>
					<DataTable.Title numeric>Waste Points</DataTable.Title>
				</DataTable.Header>

				{loading? <SafeAreaView/>: userScores()}

				<DataTable.Pagination
					page={page}
					numberOfPages={3}
					onPageChange={page => setPage(page)}
					label="1-2 of 6"
					// optionsPerPage={optionsPerPage}
					// itemsPerPage={itemsPerPage}
					// setItemsPerPage={setItemsPerPage}
					// showFastPagination
					// optionsLabel={'Rows per page'}
				/>
			</DataTable>
		</SafeAreaView>
	);
};

export default ScoresTable;
