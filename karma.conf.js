const config = require('./config');
const glob = require('./utils').glob;
const webpackConfig = require('./webpack.config.js');

const buildDir = config.buildDir;
const files = config.files;

module.exports = config => {
	const testFiles = [].concat(files.vendor_js, files.test_vendor_js, [
		'src/**/*.module.js',
		'src/**/*.js',
		'src/**/*.+(spec|test).jsx'
	]);

	let karmaWebpackConfig = Object.assign({}, webpackConfig, {
		devtool: 'cheap-inline-source-map',
		plugins: webpackConfig.plugins.filter(plugin => {
			// Remove the HtmlWebpackPlugin
			return !plugin.options || !plugin.options.filename || !plugin.options.filename === 'index.html';
		})
	});
	delete karmaWebpackConfig.entry;

	config.set({
		basePath: './',
		browsers: ['Chrome'],
		files: testFiles,
		exclude: ['src/**/index.js'],
		frameworks: ['jasmine'],
		preprocessors: { 'src/**/*.jsx': ['webpack', 'sourcemap'] },
		reporters: ['spec'],
		singleRun: false,
		webpack: karmaWebpackConfig,
		beforeMiddleware: ['webpackBlocker']
	});
};
