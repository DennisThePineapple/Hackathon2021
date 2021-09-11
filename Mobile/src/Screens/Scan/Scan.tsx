import { useNavigation } from '@react-navigation/core';
import Icon from 'Components/Icon/Icon';
import { ScanNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, {FC, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera, TakePictureResponse} from 'react-native-camera';
import Colours from 'Theme/Colours';

import * as Styles from './Scan.styles';
import {useUser} from "../../Context/AppContext";
import ImageSummaryData from "../../Types/ImageSummaryData";

const Scan: FC = () => {
	const navigation = useNavigation<ScanNavProps>();
	const [loading, setLoading] = useState(false);
	let camera : RNCamera | null;
	const takePicture = async () => {
		if (camera) {
			const options = { quality: 1, base64: true };
			setLoading(true);
			const imageData = await camera.takePictureAsync(options);

			navigation.navigate("Scan Summary", {
				imageUri : imageData.uri,
				image : imageData.base64
				});
			}


		};


	return (
		<SafeAreaView style={{ flex: 1 }}>
			<RNCamera
				ref={ref => {
					camera = ref;
				}}
				style={StyleSheet.absoluteFill}
				captureAudio={false}
				androidCameraPermissionOptions={{
					title: 'Permission to use camera',
					message: 'We need your permission to use your camera',
					buttonPositive: 'Ok',
					buttonNegative: 'Cancel',
				}}
				androidRecordAudioPermissionOptions={{
					title: 'Permission to use audio recording',
					message: 'We need your permission to use your audio',
					buttonPositive: 'Ok',
					buttonNegative: 'Cancel',
				}}
			/>
			<View style={{ flex: 1 }}>
				<Styles.BackContainer>
					<Styles.BackButton onPress={() => navigation.goBack()}>
						<Icon family="feather" name={'chevron-left'} size={35} colour={Colours.secondary} />
					</Styles.BackButton>
				</Styles.BackContainer>
			</View>
			<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
				<TouchableOpacity onPress={takePicture}>
					<Text> SNAP </Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Scan;
