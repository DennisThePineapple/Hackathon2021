import React, { FC, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Styles from 'Components/Authentication/Authentication.styles';
import * as Atoms from 'Components/Authentication/Authentication.atoms';
import { Full } from 'Theme/Global';
import Colours from 'Theme/Colours';
import { TitleFont, SubFontBold, SubFont } from 'Theme/Fonts';
import { useNavigation } from '@react-navigation/native';
import { LoginNavProps } from 'Navigation/AuthNavigation/AuthNavigation.params';
import useLogin from 'Hooks/useLogin';
// import { Full } from 'Theme/Global';
// import { SubFont, SubFontBold, TitleFont } from 'Theme/Fonts';
// import useLogin from 'Hooks/useLogin';
// import Button from 'Components/Button/Button';
// import { useNavigation } from '@react-navigation/core';
// import { LoginNavProps } from 'Navigation/AuthNavigation/AuthNavigation.params';
// import Loading from 'Components/Loading/Loading';
// import Colours from 'Theme/Colours';

const LoginScreen: FC = () => {
	// return (
	// 	<SafeAreaView>
	// 		<Text>Login</Text>
	// 	</SafeAreaView>
	// );
	const passwordRef = useRef<TextInput>(null);
	const navigation = useNavigation<LoginNavProps>();
	const [showPassword, setShowPassword] = useState(false);

	const { loading, valid, handleChange, handleLogin } = useLogin();

	return (
		<SafeAreaView style={Full}>
			{/* <Loading visible={showSpinner} /> */}
			<ScrollView contentContainerStyle={Full} keyboardShouldPersistTaps="handled" scrollEnabled={false}>
				<Styles.Container>
					<Styles.BackContainer>
						<Atoms.Back />
					</Styles.BackContainer>

					<Styles.TitleContainer>
						<TitleFont colour={Colours.secondary}>Login</TitleFont>
					</Styles.TitleContainer>

					<Styles.InputContainer>
						<Styles.Input
							placeholder="Email"
							placeholderTextColor={Colours.Greys.GREY3}
							keyboardType="email-address"
							autoCapitalize="none"
							returnKeyType="next"
							blurOnSubmit={false}
							onChangeText={e => handleChange(e, 'email')}
							onSubmitEditing={() => passwordRef.current?.focus()}
						/>
					</Styles.InputContainer>
					<Styles.InputContainer>
						<Styles.Input
							ref={passwordRef}
							returnKeyType="go"
							placeholder="Password"
							placeholderTextColor={Colours.Greys.GREY3}
							onChangeText={e => handleChange(e, 'password')}
							secureTextEntry={!showPassword}
							onSubmitEditing={handleLogin}
						/>
						<Styles.IconContainer>
							<Atoms.Eye open={showPassword} onPress={() => setShowPassword(prev => !prev)} />
						</Styles.IconContainer>
					</Styles.InputContainer>

					<Styles.AuthButton text="Login" fullWidth bold onPress={handleLogin} disabled={!valid} />
				</Styles.Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default LoginScreen;
