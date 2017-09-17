module.exports = config => {
	config.set({
		basePath: './.build',
		browsers: ['Chrome'],
		files: [
			'node_modules/**/*.js',
			'../node_modules/angular-mocks/angular-mocks.js',
			'../src/**/*.{spec,test}.js',
			'**/*.module.js',
			'**/*.js'
		],
		frameworks: ['jasmine'],
		plugins: ['karma-chrome-launcher', 'karma-jasmine', 'karma-spec-reporter'],
		reporters: ['spec']
	});
};
