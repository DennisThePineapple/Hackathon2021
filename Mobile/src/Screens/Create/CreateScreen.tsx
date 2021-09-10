import React, { FC, useRef, useState } from 'react';
import { SafeAreaView, Text, TextInput } from 'react-native';
// import Colours from 'Theme/Colours';
// import { SubFont, SubFontBold, TitleFont } from 'Theme/Fonts';
// import { Full } from 'Theme/Global';
// import Icon from 'Components/Icon/Icon';
// import Button from 'Components/Button/Button';
// import useCreate from 'Hooks/useCreate';
// import * as Styles from 'Components/Auth/Auth.styles';
// import * as Atoms from 'Components/Auth/Auth.atoms';
// import { useNavigation } from '@react-navigation/core';
// import { CreateNavProps } from 'Navigation/AuthNavigation/AuthNavigation.params';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Responsive from 'Utils/Responsive';
// import Loading from 'Components/Loading/Loading';
// import SocialAuth from 'Components/SocialAuth/SocialAuth';

const CreateScreen: FC = () => {
	return (
		<SafeAreaView>
			<Text>Create</Text>
		</SafeAreaView>
	);
	// const emailRef = useRef<TextInput>(null);
	// const passwordRef = useRef<TextInput>(null);
	// const scrollRef = useRef<KeyboardAwareScrollView>(null);

	// const navigation = useNavigation<CreateNavProps>();
	// const [showPassword, setShowPassword] = useState(false);
	// const { showSpinner, valid, handleChange, handleCreate } = useCreate();

	// return (
	// 	<SafeAreaView style={Full}>
	// 		<Loading visible={showSpinner} />
	// 		<KeyboardAwareScrollView
	// 			ref={scrollRef}
	// 			onKeyboardWillShow={() => scrollRef.current?.scrollToPosition(0, Responsive.h(7))}
	// 			contentContainerStyle={Full}
	// 			keyboardShouldPersistTaps="handled"
	// 			scrollEnabled={false}
	// 		>
	// 			<Styles.Container>
	// 				<Styles.TitleContainer>
	// 					<Icon
	// 						family="fontawesome5"
	// 						name="car"
	// 						colour={Colours.primary}
	// 						size={24}
	// 						style={Styles.TitleIcon}
	// 					/>
	// 					<TitleFont>Drive</TitleFont>
	// 				</Styles.TitleContainer>

	// 				<Styles.InputContainer>
	// 					<Styles.Input
	// 						placeholder="Name"
	// 						placeholderTextColor={Colours.Greys.GREY3}
	// 						returnKeyType="next"
	// 						blurOnSubmit={false}
	// 						onChangeText={e => handleChange(e, 'name')}
	// 						onSubmitEditing={() => emailRef.current?.focus()}
	// 					/>
	// 					<Styles.IconContainer>{valid.name && <Atoms.Check />}</Styles.IconContainer>
	// 				</Styles.InputContainer>

	// 				<Styles.InputContainer>
	// 					<Styles.Input
	// 						ref={emailRef}
	// 						placeholder="Email"
	// 						placeholderTextColor={Colours.Greys.GREY3}
	// 						keyboardType="email-address"
	// 						autoCapitalize="none"
	// 						returnKeyType="next"
	// 						blurOnSubmit={false}
	// 						onChangeText={e => handleChange(e, 'email')}
	// 						onSubmitEditing={() => passwordRef.current?.focus()}
	// 					/>
	// 					<Styles.IconContainer>{valid.email && <Atoms.Check />}</Styles.IconContainer>
	// 				</Styles.InputContainer>

	// 				<Styles.InputContainer>
	// 					<Styles.Input
	// 						ref={passwordRef}
	// 						placeholder="Password (6+ Characters)"
	// 						placeholderTextColor={Colours.Greys.GREY3}
	// 						returnKeyType="go"
	// 						secureTextEntry={!showPassword}
	// 						onChangeText={e => handleChange(e, 'password')}
	// 						onSubmitEditing={handleCreate}
	// 					/>
	// 					<Styles.IconContainer>
	// 						{valid.password && <Atoms.Check />}
	// 						<Atoms.Eye open={showPassword} onPress={() => setShowPassword(prev => !prev)} />
	// 					</Styles.IconContainer>
	// 				</Styles.InputContainer>

	// 				<Styles.AuthButton
	// 					text="Create Account"
	// 					fullWidth
	// 					onPress={handleCreate}
	// 					disabled={Object.values(valid).some(value => !value)}
	// 				/>

	// 				<Styles.SubFontContainer>
	// 					<SubFontBold>Or</SubFontBold>
	// 				</Styles.SubFontContainer>

	// 				<SocialAuth />

	// 				<Styles.BottomTextContainer onPress={() => navigation.navigate('Login')}>
	// 					<SubFont>Already have an account? </SubFont>
	// 					<SubFontBold>Login</SubFontBold>
	// 				</Styles.BottomTextContainer>
	// 			</Styles.Container>
	// 		</KeyboardAwareScrollView>
	// 	</SafeAreaView>
	// );
};

export default CreateScreen;
