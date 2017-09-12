const del = require('del');
const _glob = require('glob');
const gulp = require('gulp');
const ignore = require('gulp-ignore');
const path = require('path');
const sass = require('gulp-sass');
const swig = require('gulp-swig');

const buildDir = './.build/';
const files = {
	html: ['src/**/*.html'],
	index: ['src/index.html'],
	js: ['src/**/*.module.js', 'src/**/*.js'],
	sass: ['src/styles.scss'],
	vendor_js: ['node_modules/angular/angular.js']
};

gulp.task('default', ['clean', 'copy', 'sass', 'index']);

gulp.task('clean', () => {
	del.sync([buildDir]);
});

gulp.task('copy-js', copyJs);

gulp.task('copy-vendor-js', copyVendorJs);

gulp.task('copy-html', copyHtml);

gulp.task('copy', ['copy-vendor-js', 'copy-js', 'copy-html']);

gulp.task('index', index);

gulp.task('sass', processSass);

gulp.task('watch', () => {
	gulp.watch(files.html, onHtmlChange);
	gulp.watch(files.index, onIndexChange);
	gulp.watch(files.js, onJsChange);
	gulp.watch('src/**/*.scss', onSassChange);
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
	const styles = glob(files.sass).map(scss => scss.replace(/^src\//, 'assets/').replace(/\.scss$/, '.css'));
	gulp
		.src(files.index)
		.pipe(swig({ data: { scripts, styles } }))
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

function onSassChange(event) {
	console.log(`onSassChange: ${event.path}`);
	processSass();
}

function processSass() {
	gulp
		.src(files.sass)
		.pipe(sass({ includePaths: './node_modules' }).on('error', sass.logError))
		.pipe(gulp.dest(path.join(buildDir, 'assets')));
}
