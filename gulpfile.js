const del = require('del');
const _glob = require('glob');
const gulp = require('gulp');
const ignore = require('gulp-ignore');
const path = require('path');
const swig = require('gulp-swig');

const buildDir = './.build/';
const files = {
	html: ['src/**/*.html'],
	index: ['src/index.html'],
	js: ['src/**/*.module.js', 'src/**/*.js'],
	vendor_js: ['node_modules/angular/angular.js']
};

gulp.task('default', ['clean', 'copy', 'index']);

gulp.task('clean', () => {
	del.sync([buildDir]);
});

gulp.task('copy-js', copyJs);

gulp.task('copy-vendor-js', copyVendorJs);

gulp.task('copy-html', copyHtml);

gulp.task('copy', ['copy-vendor-js', 'copy-js', 'copy-html']);

gulp.task('index', index);

gulp.task('watch', () => {
	gulp.watch(files.html, onHtmlChange);
	gulp.watch(files.index, onIndexChange);
	gulp.watch(files.js, onJsChange);
});

function glob(patterns) {
	return patterns.reduce(
		(aggregator, pattern) => {
			let map = Object.assign({}, aggregator.map); // copy object
			let fileArray = aggregator.files.slice(); // copy array
			_glob.sync(pattern).forEach(file => {
				if (!map[file]) {
					map[file] = file;
					fileArray.push(file);
				}
			});
			return {
				files: fileArray,
				map: map
			};
		},
		{ files: [], map: {} }
	).files;
}

function copyHtml() {
	gulp
		.src(files.html)
		.pipe(ignore.exclude('**/index.html'))
		.pipe(gulp.dest(buildDir));
}

function copyJs() {
	gulp.src(files.js).pipe(gulp.dest(buildDir));
}

function copyVendorJs() {
	gulp.src(files.vendor_js).pipe(
		gulp.dest(file => {
			const src = path.resolve('./');
			const filePath = file.base.replace(src, '');
			return path.join(buildDir, filePath);
		})
	);
}

function index() {
	const patterns = files.vendor_js.concat(files.js);
	const scripts = glob(patterns).map(script => script.replace(/^src\//, ''));
	gulp
		.src(files.index)
		.pipe(swig({ data: { scripts } }))
		.pipe(gulp.dest(buildDir));
}

function onHtmlChange(event) {
	console.log(`onHtmlChange: ${event.path}`);
	// if (event.type === 'changed') {
	// 	del.sync(event.path);
	// }
	copyHtml();
}

function onIndexChange(event) {
	console.log(`onIndexChange: ${event.path}`);
	// if (event.type === 'changed') {
	// 	del.sync(event.path);
	// }
	index();
}

function onJsChange(event) {
	console.log(`onJsChange: ${event.path}`);
	// if (event.type === 'changed') {
	// 	del.sync(event.path);
	// }
	copyJs();
}
