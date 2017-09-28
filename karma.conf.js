const config = require('./config');
const glob = require('./utils').glob;
const webpackConfig = require('./webpack.config');

const buildDir = config.buildDir;
const files = config.files;

module.exports = config => {
	const testFiles = [].concat(files.vendor_js, files.test_vendor_js, [
		'src/**/*.module.js',
		'test/**/*.js',
		'src/**/*.js',
		'test/bootstrap.ts'
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
		exclude: ['src/**/index.js', 'src/app/app.imports.js'],
		files: testFiles,
		frameworks: ['jasmine'],
		preprocessors: {
			'**/*.ts': ['webpack', 'sourcemap']
		},
		reporters: ['spec'],
		singleRun: false,
		// Need this to load TypeScript tests in Karma
		mime: {
			'text/x-typescript': ['ts', 'tsx']
		},
		webpack: karmaWebpackConfig,
		beforeMiddleware: ['webpackBlocker']
	});
};
