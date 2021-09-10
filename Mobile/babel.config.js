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
					components: './src/components',
					screens: './src/screens',
					hooks: './src/hooks',
					navigation: './src/navigation',
					reducers: './src/reducers',
				},
			},
		],
	],
};
