import React, {FC, useEffect, useState} from "react";
import {Button, SafeAreaView, Text} from "react-native";
import { DataTable } from 'react-native-paper';
import Userscore from "../../Types/Userscore";
import ScoresTable from "./ScoresTable";


const Home: FC = () => {
    const [period, setPeriod] = useState("day");
    const handleSetYear = () => {
        setPeriod("year");
    }
    const handleSetMonth = () => {
        setPeriod("month");
    }
    const handleSetDay = () => {
        setPeriod("day");
    }
    return (
        <SafeAreaView>
            <Text>Home</Text>
            <Button
                title="Yearly"
                onPress={handleSetYear}
            />
            <Button
                title="Monthly"
                onPress={handleSetMonth}
            />
            <Button
                title="Daily"
                onPress={handleSetDay}
            />
            <ScoresTable time={period}/>
        </SafeAreaView>

    );
}

export default Home;