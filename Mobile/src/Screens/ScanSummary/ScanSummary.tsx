import { useNavigation } from '@react-navigation/core';
import Icon from 'Components/Icon/Icon';
import {ScanSummaryNavProps} from 'Navigation/AppNavigation/AppNavigation.params';
import React, { FC } from 'react';
import {Dimensions, Image, ImageSourcePropType, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from "@react-navigation/native";
import * as Styles from "../Scan/Scan.styles";
import Colours from "../../Theme/Colours";
import ImageSummaryData from "../../Types/ImageSummaryData";
import {Modal} from "react-native-paper";
import MaterialBox from "../../Types/MaterialBox";

type ScanSummaryProps = {
	route : { params : {
		imageUri: string,
		imageData: ImageSummaryData
		}
	}
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ScanSummary: (route: RouteProp<{ params: { imageUri: string, imageData: ImageSummaryData } }, 'params'>) =>
	JSX.Element = (route: RouteProp<{ params: { imageUri: string, imageData: ImageSummaryData} }, 'params'>) => {
	const navigation = useNavigation<ScanSummaryNavProps>();
	const imageData = route.route.params.imageData;
	const imageUri = route.route.params.imageUri;
	const renderBoxes = () => {
		let index = 0;
		return imageData.material_box_coordinates.map((boxData:MaterialBox) => {
			return <View key = {index++} style={{backgroundColor: 'blue',position: 'absolute', top: windowHeight*boxData.y1, left: windowWidth*boxData.x1, right: windowWidth-windowWidth*boxData.x2, bottom: windowHeight-windowHeight*boxData.y2, justifyContent: 'center', alignItems: 'center'}}>
				<Text>{boxData.class}</Text>
			</View>
		}
		)
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
			{imageData.material_box_coordinates != null? renderBoxes() : ""}
		</SafeAreaView>
	);
};

export default ScanSummary;
