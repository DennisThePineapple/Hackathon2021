import React, { FC, useEffect, useState } from 'react';
import {SafeAreaView, Text } from 'react-native';
import {Appbar, Card, DataTable, Button} from 'react-native-paper';
import Userscores from '../../Types/Userscores';
import ScoresTable from './ScoresTable';

const Home: FC = () => {
	const [period, setPeriod] = useState('1');
	const [buttonState, setButton] = useState([true, false, false]);
	const setDay = () => {
		setPeriod("1");
		setButton([true, false, false]);
	}
	const setWeek = () => {
		setPeriod("7");
		setButton([false, true, false]);
	}
	const setMonth = () => {
		setPeriod("30");
		setButton([false, false, true]);
	}
	return (
		<SafeAreaView>
			<Card>
				<Card.Actions style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
					<Button onPress = {setDay} disabled = {buttonState[0]}>Daily</Button>
					<Button onPress = {setWeek} disabled = {buttonState[1]}>Weekly</Button>
					<Button onPress = {setMonth} disabled = {buttonState[2]}>Monthly</Button>
				</Card.Actions>
			</Card>
			<ScoresTable time={period} />
		</SafeAreaView>
	);
};

export default Home;
