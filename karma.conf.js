const config = require('./config');
const glob = require('./utils').glob;

const buildDir = config.buildDir;
const files = config.files;

module.exports = config => {
	const testFiles = [].concat(files.vendor_js, files.test_vendor_js, [
		'src/**/*.module.js',
		'src/**/*.js',
		'src/**/*.+(spec|test).ts'
	]);

	config.set({
		basePath: './',
		browsers: ['Chrome'],
		exclude: ['src/**/index.js', 'src/app/app.imports.js'],
		files: testFiles,
		frameworks: ['jasmine'],
		plugins: [
			'karma-chrome-launcher',
			'karma-jasmine',
			'karma-spec-reporter',
			'karma-webpack',
			'karma-sourcemap-loader'
		],
		preprocessors: {
			'src/**/*.+(spec|test).ts': ['webpack', 'sourcemap']
		},
		reporters: ['spec'],
		singleRun: false
	});
};
