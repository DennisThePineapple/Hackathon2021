import { useNavigation, useRoute } from '@react-navigation/core';
import Icon from 'Components/Icon/Icon';
import { InfoNavProps, InfoRouteProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { FC, useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colours from 'Theme/Colours';
import { BodyFont } from 'Theme/Fonts';
import { Full } from 'Theme/Global';
import * as Styles from './Info.styles';

const Info: FC = () => {
	const navigation = useNavigation<InfoNavProps>();
	const route = useRoute<InfoRouteProps>();

	return (
		<SafeAreaView style={Full}>
			<Styles.TitleContainer>
				<Styles.BackButton onPress={() => navigation.goBack()}>
					<Icon family="feather" name={'chevron-left'} size={35} colour={Colours.accent} />
				</Styles.BackButton>
				<Styles.Title colour={Colours.accent}>{route.params.material}</Styles.Title>
			</Styles.TitleContainer>
			<Styles.BodyContainer>
				<BodyFont>Put shiz in here</BodyFont>
			</Styles.BodyContainer>
		</SafeAreaView>
	);
};

export default Info;
