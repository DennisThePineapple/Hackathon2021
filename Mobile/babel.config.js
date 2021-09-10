module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		'@babel/plugin-proposal-export-namespace-from',
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: [
					'.ios.ts',
					'.android.ts',
					'.ts',
					'.ios.tsx',
					'.android.tsx',
					'.tsx',
					'.jsx',
					'.js',
					'.json',
				],
				alias: {
					Components: './src/Components',
					Screens: './src/Screens',
					Hooks: './src/Hooks',
					Navigation: './src/Navigation',
					Reducers: './src/Reducers',
				},
			},
		],
	],
};
