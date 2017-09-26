const config = require('./config');
const glob = require('./utils').glob;

const buildDir = config.buildDir;
const files = config.files;

module.exports = config => {
	// const testFiles = glob([].concat(files.vendor_js, files.test_vendor_js, files.test_js, files.js)).map(file => {
	// 	if (/^src\//i.test(file) && !/\.(spec|test)\.js$/i.test(file)) {
	// 		return file.replace(/^src\//i, buildDir);
	// 	}
	// 	return file;
	// });

	const testFiles = [].concat(files.vendor_js, files.test_vendor_js, [
		'src/**/*.module.js',
		'src/**/*.{spec,test}.js',
		'src/**/*.js'
	]);

	config.set({
		basePath: './',
		browsers: ['Chrome'],
		files: testFiles,
		frameworks: ['jasmine'],
		plugins: ['karma-chrome-launcher', 'karma-jasmine', 'karma-spec-reporter'],
		reporters: ['spec']
	});
};
