import { useNavigation } from '@react-navigation/core';
import Icon from 'Components/Icon/Icon';
import { ScanNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Colours from 'Theme/Colours';

import * as Styles from './Scan.styles';

const Scan: FC = () => {
	const navigation = useNavigation<ScanNavProps>();
	// console.log(RNCamera.Constants.CameraStatus);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<RNCamera
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
		</SafeAreaView>
	);
};

export default Scan;
