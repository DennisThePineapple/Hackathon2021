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
	const [user] = useUser();
	const [loading, setLoading] = useState(false);
	const [imageBoxes, setimageBoxes] = useState<ImageSummaryData>();
	let camera : RNCamera | null;
	const takePicture = async () => {
		if (camera) {
			const options = { quality: 0.1, base64: true };
			setLoading(true);
			const imageData = await camera.takePictureAsync(options);
			await fetchBoxes(imageData);
			if (!loading){
				navigation.navigate("Scan Summary", {
					imageUri : imageData.uri,
					imageData : imageBoxes
				});
			}
		}
	};
	const url = "http://192.168.0.37:5000/api/submit"
	const fetchBoxes = (imageData : TakePictureResponse) => {
		const formData = new FormData();
		formData.append("file", imageData.base64);
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
				console.log(result);
				setimageBoxes(result);
				setLoading(false);
			})
			.catch(error => {
				console.log(error);
			});
	}
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
