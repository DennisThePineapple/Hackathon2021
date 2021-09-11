import React, { FC } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Styles from './TabBar.styles';
import { StyleSheet } from 'react-native';
import Icon from 'Components/Icon/Icon';
import Colours from 'Theme/Colours';
import LinearGradient from 'react-native-linear-gradient';

const TabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
	const handleNavigation = (): void => {
		const parentNavigator = navigation.getParent();
		parentNavigator && parentNavigator.navigate('Scan');
	};

	return (
		<Styles.Container>
			<Styles.IconButton onPress={() => navigation.navigate('Leaderboard')} disabled={state.index === 0}>
				<Styles.IconContainer>
					<Icon
						family="feather"
						name="award"
						size={35}
						colour={state.index === 0 ? Colours.secondary : Colours.primary}
					/>
				</Styles.IconContainer>
			</Styles.IconButton>
			<Styles.AddContainer>
				<Styles.AddWrapper />
				<Styles.AddButton onPress={handleNavigation}>
					<LinearGradient
						style={[StyleSheet.absoluteFill]}
						colors={[Colours.secondary, Colours.green]}
						start={{ x: 0.3, y: 0 }}
						end={{ x: 1, y: 0 }}
					/>
					<Icon family="fontawesome5" name="recycle" size={35} colour={Colours.primary} />
				</Styles.AddButton>
			</Styles.AddContainer>
			<Styles.IconButton onPress={() => navigation.navigate('Profile')} disabled={state.index === 1}>
				<Styles.IconContainer>
					<Icon
						family="feather"
						name="user"
						size={35}
						colour={state.index === 1 ? Colours.secondary : Colours.primary}
					/>
				</Styles.IconContainer>
			</Styles.IconButton>
		</Styles.Container>
	);
};

export default TabBar;
