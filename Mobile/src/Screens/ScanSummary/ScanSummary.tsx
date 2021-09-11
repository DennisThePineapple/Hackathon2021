import { useNavigation } from '@react-navigation/core';
import Icon from 'Components/Icon/Icon';
import {ScanSummaryNavProps} from 'Navigation/AppNavigation/AppNavigation.params';
import React, {FC, useEffect, useState} from 'react';
import {Dimensions, Image, ImageSourcePropType, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from "@react-navigation/native";
import * as Styles from "../Scan/Scan.styles";
import Colours from "../../Theme/Colours";
import ImageSummaryData from "../../Types/ImageSummaryData";
import {Modal} from "react-native-paper";
import MaterialBox from "../../Types/MaterialBox";
import {TakePictureResponse} from "react-native-camera";
import {useUser} from "../../Context/AppContext";

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
					return <View key = {index++} style={{backgroundColor: 'blue',position: 'absolute', top: windowHeight*boxData.y1, left: windowWidth*boxData.x1, right: windowWidth-windowWidth*boxData.x2, bottom: windowHeight-windowHeight*boxData.y2, justifyContent: 'center', alignItems: 'center'}}>
						<Text>{boxData.class}</Text>
					</View>
				}) : <View/>;




	}
	const renderModal = () => {
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Image style={StyleSheet.absoluteFill} source={{uri : imageUri}}/>
			<View style={{ flex: 1 }}>
				<Styles.BackContainer>
					<Styles.BackButton onPress={() => navigation.goBack()}>
						<Icon family="feather" name={'chevron-left'} size={35} colour={Colours.secondary} />
					</Styles.BackButton>
				</Styles.BackContainer>
			</View>
			{renderBoxes()}
		</SafeAreaView>
	);
};

export default ScanSummary;
