import React, { FC, useEffect, useState } from 'react';
import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Userscores from '../../Types/Userscores';
import { DataTable } from 'react-native-paper';
import {getRecPoints, getWastePoints} from "../../Utils/Points";

type scoreTableProps = {
	time: string;
};

const ScoresTable: (props: scoreTableProps) => JSX.Element = (props: scoreTableProps) => {
	const [loading, setLoading] = useState(true);
	const [scoreData, setScoreData] = useState<Userscores>([]);
	const url = 'http://192.168.0.37:5000/api/leaderboards?past_days=' + props.time;
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
	},[props.time]);

	const userScores = () => {
		let index = 1;
		return scoreData.map(userData => (
			<DataTable.Row key = {index}>
				<DataTable.Cell>{index++}</DataTable.Cell>
				<DataTable.Cell>{userData[0]}</DataTable.Cell>
				<DataTable.Cell>{userData[1].total}</DataTable.Cell>
				<DataTable.Cell>{getRecPoints(userData)}</DataTable.Cell>
				<DataTable.Cell>{getWastePoints(userData[1].materials)}</DataTable.Cell>
			</DataTable.Row>
		));
	};
	return (

		<SafeAreaView>
			<View
				style={{
					borderBottomColor: 'black',
					borderBottomWidth: 1,
				}}
			/>
				<DataTable>
					<ScrollView stickyHeaderIndices={[0]} bounces={false} bouncesZoom={false} alwaysBounceVertical = {false}>
						<DataTable.Header style = {{backgroundColor : 'white'}}>
							<DataTable.Title>Ranking</DataTable.Title>
							<DataTable.Title>Name</DataTable.Title>
							<DataTable.Title>Points</DataTable.Title>
							<DataTable.Title>Recycled</DataTable.Title>
							<DataTable.Title>Waste</DataTable.Title>
						</DataTable.Header>
						<View
							style={{
								borderBottomColor: 'black',
								borderBottomWidth: 1,
							}}
						/>
						{loading? <SafeAreaView/>: userScores()}

					</ScrollView>

				</DataTable>


		</SafeAreaView>
	);
};

export default ScoresTable;
