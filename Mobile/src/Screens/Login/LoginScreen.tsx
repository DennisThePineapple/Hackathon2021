import React, { FC, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
// import * as Styles from 'Components/Auth/Auth.styles';
// import * as Atoms from 'Components/Auth/Auth.atoms';
// import { Full } from 'Theme/Global';
// import { SubFont, SubFontBold, TitleFont } from 'Theme/Fonts';
// import useLogin from 'Hooks/useLogin';
// import Button from 'Components/Button/Button';
// import { useNavigation } from '@react-navigation/core';
// import { LoginNavProps } from 'Navigation/AuthNavigation/AuthNavigation.params';
// import Loading from 'Components/Loading/Loading';
// import Colours from 'Theme/Colours';

const LoginScreen: FC = () => {
	return (
		<SafeAreaView>
			<Text>Login</Text>
		</SafeAreaView>
	);
	// const passwordRef = useRef<TextInput>(null);
	// const navigation = useNavigation<LoginNavProps>();
	// const [showPassword, setShowPassword] = useState(false);

	// const { showSpinner, valid, handleChange, handleLogin } = useLogin();

	// return (
	// 	<SafeAreaView style={Full}>
	// 		<Loading visible={showSpinner} />
	// 		<ScrollView contentContainerStyle={Full} keyboardShouldPersistTaps="handled" scrollEnabled={false}>
	// 			<Styles.Container>
	// 				<Styles.BackContainer>
	// 					<Atoms.Back />
	// 				</Styles.BackContainer>

	// 				<Styles.TitleContainer>
	// 					<TitleFont>Login</TitleFont>
	// 				</Styles.TitleContainer>

	// 				<Styles.InputContainer>
	// 					<Styles.Input
	// 						placeholder="Email"
	// 						placeholderTextColor={Colours.Greys.GREY3}
	// 						keyboardType="email-address"
	// 						autoCapitalize="none"
	// 						returnKeyType="next"
	// 						blurOnSubmit={false}
	// 						onChangeText={e => handleChange(e, 'email')}
	// 						onSubmitEditing={() => passwordRef.current?.focus()}
	// 					/>
	// 				</Styles.InputContainer>
	// 				<Styles.InputContainer>
	// 					<Styles.Input
	// 						ref={passwordRef}
	// 						returnKeyType="go"
	// 						placeholder="Password"
	// 						placeholderTextColor={Colours.Greys.GREY3}
	// 						onChangeText={e => handleChange(e, 'password')}
	// 						secureTextEntry={!showPassword}
	// 						onSubmitEditing={handleLogin}
	// 					/>
	// 					<Styles.IconContainer>
	// 						<Atoms.Eye open={showPassword} onPress={() => setShowPassword(prev => !prev)} />
	// 					</Styles.IconContainer>
	// 				</Styles.InputContainer>

	// 				<Styles.AuthButton text="Login" fullWidth onPress={handleLogin} disabled={!valid} />
	// 				<Styles.SubFontContainer>
	// 					<Styles.ForgotButton onPress={() => navigation.navigate('Forgot')}>
	// 						<SubFontBold>Forgot Password?</SubFontBold>
	// 					</Styles.ForgotButton>
	// 				</Styles.SubFontContainer>

	// 				<Styles.BottomTextContainer onPress={() => navigation.navigate('Create')}>
	// 					<SubFont>New to Drive? </SubFont>
	// 					<SubFontBold>Sign up</SubFontBold>
	// 				</Styles.BottomTextContainer>
	// 			</Styles.Container>
	// 		</ScrollView>
	// 	</SafeAreaView>
	// );
};

export default LoginScreen;
