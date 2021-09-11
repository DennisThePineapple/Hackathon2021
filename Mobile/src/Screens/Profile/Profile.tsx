import { Material, Stats } from 'API/Responses';
import { useUser } from 'Context/AppContext';
import useStats from 'Hooks/useStats';
import React, { FC, useState } from 'react';
import { BodyFont, fontFamily } from 'Theme/Fonts';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import * as Styles from './Profile.styles';
import Colours from 'Theme/Colours';
import { ScrollView } from 'react-native-gesture-handler';
import { TabelRow, TableCell } from 'Components/Table/Table.styles';

const timeMap: Record<number, keyof Stats> = {
	0: 'week',
	1: 'month',
	2: 'year',
	3: 'allTime',
};

const timeTextMap: Record<keyof Stats, string> = {
	week: 'this week',
	month: 'this month',
	year: 'this year',
	allTime: 'since joining',
};

const Profile: FC = () => {
	const [user] = useUser();
	const { loading, stats } = useStats();
	const [timeIndex, setTimeIndex] = useState(0);

	const currentStats = stats && stats[timeMap[timeIndex]];

	return (
		<Styles.Container>
			<Styles.FontContainer>
				<Styles.Font>Welcome back {user?.displayName}!</Styles.Font>
				<Styles.Font>
					You've earned <BodyFont colour={Colours.secondary}>{currentStats?.total}</BodyFont> points{' '}
					{timeTextMap[timeMap[timeIndex]]}. Keep it up! Every little bit helps
				</Styles.Font>
			</Styles.FontContainer>

			<SegmentedControl
				tintColor={Colours.accent}
				backgroundColor={Colours.primary}
				values={['Week', 'Month', 'Year', 'Total']}
				selectedIndex={timeIndex}
				fontStyle={{ fontFamily: fontFamily, color: Colours.accent }}
				onChange={e => setTimeIndex(e.nativeEvent.selectedSegmentIndex)}
			/>

			<Styles.TableContainer>
				<TabelRow header>
					<TableCell flex={2}>
						<BodyFont colour={Colours.primary}>Material</BodyFont>
					</TableCell>
					<TableCell flex={1.5} align="center">
						<BodyFont colour={Colours.primary}>Tally</BodyFont>
					</TableCell>
					<TableCell flex={1.5} align="center">
						<BodyFont colour={Colours.primary}>Score</BodyFont>
					</TableCell>
				</TabelRow>
				<ScrollView showsVerticalScrollIndicator={false}>
					{currentStats &&
						Object.entries(currentStats.materials).map(([material, values]: [string, Material | null]) => (
							<TabelRow key={material}>
								<TableCell flex={2}>
									<BodyFont>{material}</BodyFont>
								</TableCell>
								<TableCell flex={1.5} align="center">
									<BodyFont>{values ? values.occurences : 0}</BodyFont>
								</TableCell>
								<TableCell flex={1.5} align="center">
									<BodyFont>{values ? values.points : 0}</BodyFont>
								</TableCell>
							</TabelRow>
						))}
				</ScrollView>
			</Styles.TableContainer>
		</Styles.Container>
	);
};

export default Profile;
