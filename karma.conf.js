const config = require('./config');
const glob = require('./utils').glob;

const buildDir = config.buildDir;
const files = config.files;

module.exports = config => {
	const testFiles = [].concat(files.vendor_js, files.test_vendor_js, ['src/**/*.module.js', 'src/**/*.js']);

	config.set({
		basePath: './',
		browsers: ['Chrome'],
		files: testFiles,
		exclude: ['src/**/index.js'],
		frameworks: ['jasmine'],
		plugins: ['karma-chrome-launcher', 'karma-jasmine', 'karma-spec-reporter'],
		reporters: ['spec']
	});
};
