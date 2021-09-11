import { useNavigation } from '@react-navigation/core';
import Icon from 'Components/Icon/Icon';
import {ScanSummaryNavProps} from 'Navigation/AppNavigation/AppNavigation.params';
import React, { FC } from 'react';
import {Dimensions, Image, ImageSourcePropType, SafeAreaView, StyleSheet, View} from 'react-native';
import {RouteProp} from "@react-navigation/native";
import * as Styles from "../Scan/Scan.styles";
import Colours from "../../Theme/Colours";


const ScanSummary: (route: RouteProp<{ params: { imageUri: string } }, 'params'>) =>
	JSX.Element = (route: RouteProp<{ params: { imageUri: string } }, 'params'>) => {
	const navigation = useNavigation<ScanSummaryNavProps>();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Image style={{
				flex: 1,
				justifyContent: 'flex-end',
				alignItems: 'center',
				height: Dimensions.get('window').height,
				width: Dimensions.get('window').width
			}} source={{uri : route.route.params.imageUri}}/>
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

export default ScanSummary;
