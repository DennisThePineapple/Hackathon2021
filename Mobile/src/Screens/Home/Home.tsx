import API from 'API/API';
import React, { FC, useEffect, useState } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import Userscores from '../../Types/Userscores';
import ScoresTable from './ScoresTable';
import * as Styles from './Home.styles';
import { ScrollView } from 'react-native-gesture-handler';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Colours from 'Theme/Colours';
import { BodyFont, fontFamily, SubFont } from 'Theme/Fonts';
import useLeaderboard from 'Hooks/useLeaderboard';
import Icon from 'Components/Icon/Icon';
import { TabelRow, TableCell } from 'Components/Table/Table.styles';

const timeMap: Record<number, number> = {
	0: 1,
	1: 7,
	2: 30,
};

const Home: FC = () => {
	const [timeIndex, setTimeIndex] = useState(0);

	const { loading, leaderboard } = useLeaderboard(timeMap[timeIndex]);

	console.log(leaderboard.slice(3).map(user => user.name));

	// console.log(leaderboard[10]);

	return (
		<Styles.Container>
			<SegmentedControl
				tintColor={Colours.accent}
				backgroundColor={Colours.primary}
				values={['Today', 'Week', 'Month']}
				selectedIndex={timeIndex}
				fontStyle={{ fontFamily: fontFamily, color: Colours.accent }}
				onChange={e => setTimeIndex(e.nativeEvent.selectedSegmentIndex)}
			/>
			<Styles.TopContainer>
				<Styles.TopIcon>
					<Styles.TopFont>{leaderboard[1] && leaderboard[1].name[0]}</Styles.TopFont>
					<Styles.TopElement>
						<BodyFont>2</BodyFont>
					</Styles.TopElement>
					<Styles.BottomElement>
						<SubFont>{leaderboard[1] && leaderboard[1].name}</SubFont>
						<BodyFont>
							{leaderboard[1] && leaderboard[1].totalPoints} <SubFont>Points</SubFont>
						</BodyFont>
					</Styles.BottomElement>
				</Styles.TopIcon>
				<Styles.TopIcon best>
					<Styles.TopFont>{leaderboard[0] && leaderboard[0].name[0]}</Styles.TopFont>
					<Styles.TopElement>
						<Icon family="fontawesome5" name="crown" size={20} colour={Colours.accent} />
					</Styles.TopElement>
					<Styles.BottomElement>
						<SubFont>{leaderboard[0] && leaderboard[0].name}</SubFont>
						<BodyFont>
							{leaderboard[0] && leaderboard[0].totalPoints} <SubFont>Points</SubFont>
						</BodyFont>
					</Styles.BottomElement>
				</Styles.TopIcon>
				<Styles.TopIcon>
					<Styles.TopFont>{leaderboard[2] && leaderboard[2].name[0]}</Styles.TopFont>
					<Styles.TopElement>
						<BodyFont>3</BodyFont>
					</Styles.TopElement>
					<Styles.BottomElement>
						<SubFont>{leaderboard[2] && leaderboard[2].name}</SubFont>
						<BodyFont>
							{leaderboard[2] && leaderboard[2].totalPoints} <SubFont>Points</SubFont>
						</BodyFont>
					</Styles.BottomElement>
				</Styles.TopIcon>
			</Styles.TopContainer>
			<TabelRow header>
				<TableCell flex={1}>
					<BodyFont colour={Colours.primary}>Rank</BodyFont>
				</TableCell>
				<TableCell flex={2}>
					<BodyFont colour={Colours.primary}>Name</BodyFont>
				</TableCell>
				<TableCell flex={1.5} align="center">
					<BodyFont colour={Colours.primary}>Score</BodyFont>
				</TableCell>
			</TabelRow>
			<ScrollView showsVerticalScrollIndicator={false}>
				{leaderboard.slice(3).map((user, index) => (
					<TabelRow key={user.name}>
						<TableCell flex={1}>
							<BodyFont> {'  ' + (index + 4)}</BodyFont>
						</TableCell>
						<TableCell flex={2}>
							<BodyFont>{user.name}</BodyFont>
						</TableCell>
						<TableCell flex={1.5} align="center">
							<BodyFont>{user.totalPoints}</BodyFont>
						</TableCell>
					</TabelRow>
				))}
			</ScrollView>
		</Styles.Container>
	);
	// useEffect(() => {
	// 	(async () => {
	// 		await API.leaderboards(1);
	// 	})();
	// }, []);

	// const [period, setPeriod] = useState('1');
	// const handleSetYear = () => {
	// 	setPeriod('365');
	// };
	// const handleSetMonth = () => {
	// 	setPeriod('30');
	// };
	// const handleSetDay = () => {
	// 	setPeriod('1');
	// };
	// return (
	// 	<SafeAreaView>
	// 		<Text>Home</Text>
	// 		<Button title="Yearly" onPress={handleSetYear} />
	// 		<Button title="Monthly" onPress={handleSetMonth} />
	// 		<Button title="Daily" onPress={handleSetDay} />
	// 		{/* <ScoresTable time={period} /> */}
	// 	</SafeAreaView>
	// );
};

export default Home;
