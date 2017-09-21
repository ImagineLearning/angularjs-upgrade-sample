const path = require('path');

module.exports = {
	entry: './src/main.ts',
	output: {
		path: path.resolve(__dirname, '.build/tsc'),
		filename: 'app-ts.js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader'
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	}
};
