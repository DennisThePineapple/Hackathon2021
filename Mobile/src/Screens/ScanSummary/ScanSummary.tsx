import { useNavigation } from '@react-navigation/core';
import Icon from 'Components/Icon/Icon';
import {ScanSummaryNavProps} from 'Navigation/AppNavigation/AppNavigation.params';
import React, {FC, useEffect, useState} from 'react';
import {Dimensions, Image, ImageSourcePropType, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from "@react-navigation/native";
import * as Styles from "../Scan/Scan.styles";
import Colours from "../../Theme/Colours";
import ImageSummaryData from "../../Types/ImageSummaryData";
import {Button, Modal, Portal, Provider} from "react-native-paper";
import MaterialBox from "../../Types/MaterialBox";
import {TakePictureResponse} from "react-native-camera";
import {useUser} from "../../Context/AppContext";
import {recyclable, waste} from "../../Utils/Points";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ScanSummary: (route: RouteProp<{ params: { imageUri: string, image: string} }, 'params'>) =>
	JSX.Element = (route: RouteProp<{ params: { imageUri: string, image: string} }, 'params'>) => {
	const navigation = useNavigation<ScanSummaryNavProps>();
	const imageUri = route.route.params.imageUri;
	const [imageData, setImageData] = useState<ImageSummaryData>();
	const [user] = useUser();
	const url = "http://192.168.0.37:5000/api/submit";

	const fetchBoxes = () => {
		const formData = new FormData();
		formData.append("file", route.route.params.image);
		formData.append("userId", user?.uid);
		formData.append("username", user?.displayName);

		fetch(url, {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: formData
		})
			.then(response => response.json())
			.then(result => {
				setImageData(result);
			})
			.catch(error => {
				console.log(error);
			});
	}
	useEffect(fetchBoxes, []);

	const renderBoxes = () => {
		let index = 0;

				return imageData ?imageData.material_box_coordinates.map((boxData:MaterialBox) => {
					console.log(boxData);
					return <View key = {index++} style={{
						backgroundColor: recyclable.includes(boxData.class) ? 'yellow':'red',
						position: 'absolute',
						top: windowHeight*boxData.y1,
						left: windowWidth*boxData.x1,
						right: windowWidth-windowWidth*boxData.x2,
						bottom: windowHeight-windowHeight*boxData.y2,
						justifyContent: 'center',
						alignItems: 'center',
						opacity: 0.5}} >
						<Text>{boxData.class}</Text>
					</View>
				}) : <View/>;
		}
	const [visible, setVisible] = React.useState(true);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);
	const renderModal = () => {
		if (!imageData){
			return (
				<View/>
			)
		}
		const containerStyle = {backgroundColor: 'white', padding: 20};
		return (
			<Provider>
				<Portal>
					<Modal visible={visible} contentContainerStyle={containerStyle}>
						<Text>Recyclables:</Text>
						{recyclable.map(material =>
							imageData.material_score_breakdown[material]? <Text>{imageData.material_score_breakdown[material].occurrence} {material} Found: {imageData.material_score_breakdown[material].points} Points</Text>
								: <Text>No {material} Found : 0 Points</Text>
						)}
						<Text>Waste:</Text>
						{waste.map(material =>
							imageData.material_score_breakdown[material]? <Text>{imageData.material_score_breakdown[material].occurrence} {material} Found: {imageData.material_score_breakdown[material].points} Points</Text>
								: <Text>No {material} Found : 0 Points</Text>
						)}
						<Text>Total Points: {imageData.total_points}</Text>
						<Button style={{marginTop: 5, bottom: 0}} onPress={hideModal}>
							Sheesh.
						</Button>
					</Modal>
				</Portal>

			</Provider>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Image style={StyleSheet.absoluteFill} source={{uri : imageUri}}/>
			<View style={{ flex: 1 }}>
				<Styles.BackContainer>
					<Styles.BackButton onPress={() => navigation.goBack()}>
						<Icon family="feather" name={'chevron-left'} size={35} colour={Colours.secondary} />
					</Styles.BackButton>
				</Styles.BackContainer>
				<Button style={{position: 'absolute', bottom: 20,
					left: 0, right: 0, backgroundColor: 'blue',
					zIndex:100, width: 200,
					marginLeft: 'auto', marginRight: 'auto'}} onPress={showModal}>
					<Text style={{color:'white'}}>Show Summary</Text>
				</Button>
			</View>
			{renderBoxes()}
			{renderModal()}
		</SafeAreaView>
	);
};

export default ScanSummary;
