import React, {FC, useEffect, useState} from "react";
import {SafeAreaView, Text} from "react-native";
import Userscore from "../../Types/Userscore";
import {DataTable} from "react-native-paper";

const optionsPerPage = [2, 3, 4];
type scoreTableProps = {
    time : string;
}
// Tf is this lmao
const ScoresTable: (props: scoreTableProps) => JSX.Element = (props:scoreTableProps) => {
    const [loading, setLoading] = useState(true);
    const [scoreData, setScoreData] = useState(new Array<Userscore>())
    const [page, setPage] = React.useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    const url = "api/scores/" + props.time;
    useEffect(  () => {
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'},
        }).then(response => response.json())
            .then(scoreData => {
                setScoreData(scoreData);
                setLoading(false);
            })
        setScoreData([]);
    }, []);

    const userScores = () => {
        let index = 1;
        return scoreData.map(
            userScore =>
                <DataTable.Row>
                    <DataTable.Cell numeric>{index++}</DataTable.Cell>
                    <DataTable.Cell>{userScore.username}</DataTable.Cell>
                    <DataTable.Cell numeric>{userScore.wasteScore + userScore.recycleScore}</DataTable.Cell>
                    <DataTable.Cell numeric>{userScore.recycleScore}</DataTable.Cell>
                    <DataTable.Cell numeric>{userScore.wasteScore}</DataTable.Cell>
                </DataTable.Row>
        )
    }
    return (
// Todo: add loading anime
//         loading? <SafeAreaView/>:
        <SafeAreaView>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title numeric>Ranking</DataTable.Title>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title numeric>Points</DataTable.Title>
                    <DataTable.Title numeric>Recycle Points</DataTable.Title>
                    <DataTable.Title numeric>Waste Points</DataTable.Title>
                </DataTable.Header>


                {userScores()}

                <DataTable.Row>
                    <DataTable.Cell numeric>1</DataTable.Cell>
                    <DataTable.Cell>Lad</DataTable.Cell>
                    <DataTable.Cell numeric>1</DataTable.Cell>
                    <DataTable.Cell numeric>2</DataTable.Cell>
                    <DataTable.Cell numeric>55</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell numeric>1</DataTable.Cell>
                    <DataTable.Cell>Lad</DataTable.Cell>
                    <DataTable.Cell numeric>1</DataTable.Cell>
                    <DataTable.Cell numeric>2</DataTable.Cell>
                    <DataTable.Cell numeric>55</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Pagination
                    page={page}
                    numberOfPages={3}
                    onPageChange={(page) => setPage(page)}
                    label="1-2 of 6"
                    optionsPerPage={optionsPerPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    showFastPagination
                    optionsLabel={'Rows per page'}
                />
            </DataTable>
        </SafeAreaView>
    );
}

export default ScoresTable;