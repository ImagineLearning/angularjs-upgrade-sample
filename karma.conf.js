const config = require('./config');
const glob = require('./utils').glob;

const buildDir = config.buildDir;
const files = config.files;

module.exports = config => {
	const tsc = [`${buildDir}tsc/**/*.js`];
	const testFiles = glob([].concat(tsc, files.vendor_js, files.test_vendor_js, files.test_js, files.js)).map(file => {
		if (/^src\//i.test(file) && !/\.(spec|test)\.js$/i.test(file)) {
			return file.replace(/^src\//i, buildDir);
		}
		return file;
	});

	config.set({
		basePath: './',
		browsers: ['Chrome'],
		files: testFiles,
		frameworks: ['jasmine'],
		plugins: ['karma-chrome-launcher', 'karma-jasmine', 'karma-spec-reporter'],
		reporters: ['spec'],
		port: 9018,
		proxies: {
			'/app/': `http://localhost:9018/${buildDir}app/`
		},
	});
};
