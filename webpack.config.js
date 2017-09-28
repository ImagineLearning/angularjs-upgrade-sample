const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ContextReplacementPlugin, ProvidePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const buildDir = require('./config').buildDir;

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.join(__dirname, buildDir),
		filename: '[name].bundle.[hash:8].js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.html']
	},
	devServer: {
		contentBase: path.join(__dirname, buildDir),
		port: 5500
	},
	devtool: 'inline-source-map',
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				exclude: [/node_modules/],
				use: [{ loader: 'babel-loader', options: { presets: ['es2015', 'react'] } }]
			},
			{
				test: /\.html$/,
				exclude: /index\.html$/,
				use: [{ loader: 'ngtemplate-loader', options: { relativeTo: 'src/' } }, { loader: 'html-loader' }]
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader', options: { includePaths: ['node_modules'] } }
				]
			},
			// Necessary to be able to use AngularJS with Webpack as explained in https://github.com/webpack/webpack/issues/2049
			{ test: require.resolve('angular'), loader: 'exports-loader?window.angular' }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html',
			showErrors: true,
			// title: 'Webpack App',
			path: path.join(__dirname, buildDir),
			hash: true
		}),
		// new ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.resolve(__dirname, './src')),
		new ProvidePlugin({
			angular: 'angular'
		}),
		new CopyWebpackPlugin([
			{ from: './public', to: path.resolve(__dirname, buildDir, 'assets'), ignore: ['index.html'] }
		]),
		new CleanWebpackPlugin([buildDir])
	]
};
