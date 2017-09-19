module.exports = {
	buildDir: '.build/',
	files: {
		assets: ['src/app/data/data.json'],
		html: ['src/**/*.html'],
		index: ['src/index.html'],
		js: ['!src/**/*.{spec,test}.js', 'src/**/*.module.js', 'src/**/*.js'],
		sass: ['src/styles.scss'],
		vendor_js: ['node_modules/angular/angular.js'],
		test_js: ['src/**/*.{spec,test}.js'],
		test_vendor_js: ['node_modules/angular-mocks/angular-mocks.js']
	}
};
