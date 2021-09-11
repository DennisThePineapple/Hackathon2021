declare module 'react-native-config' {
	interface Env {
		API_HOST: string;
	}

	const Config: Env;

	export default Config;
}
