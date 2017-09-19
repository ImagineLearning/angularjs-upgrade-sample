const config = require('./config');
const del = require('del');
const glob = require('./utils').glob;
const gulp = require('gulp');
const ignore = require('gulp-ignore');
const path = require('path');
const sass = require('gulp-sass');
const swig = require('gulp-swig');
const Server = require('karma').Server;

const buildDir = config.buildDir;
const files = config.files;

gulp.task('default', ['clean', 'copy', 'sass', 'index']);

gulp.task('clean', () => {
	del.sync([buildDir]);
});

gulp.task('copy:assets', copyAssets);

gulp.task('copy:js', copyJs);

gulp.task('copy:vendor-js', copyVendorJs);

gulp.task('copy:html', copyHtml);

gulp.task('copy', ['copy:assets', 'copy:vendor-js', 'copy:js', 'copy:html']);

gulp.task('index', index);

gulp.task('sass', processSass);

gulp.task('test', ['default'], test);

gulp.task('test:watch', ['default'], testWatch);

gulp.task('watch', ['clean', 'copy', 'sass', 'index', 'test:watch'], () => {
	gulp.watch(files.html, onHtmlChange);
	gulp.watch(files.index, onIndexChange);
	gulp.watch(files.js, onJsChange);
	gulp.watch('src/**/*.scss', onSassChange);
});

function copyAssets() {
	return gulp.src(files.assets).pipe(gulp.dest(path.join(buildDir, 'assets')));
}

function copyHtml() {
	return gulp
		.src(files.html)
		.pipe(ignore.exclude('**/index.html'))
		.pipe(gulp.dest(buildDir));
}

function copyJs() {
	return gulp.src(files.js).pipe(gulp.dest(buildDir));
}

function copyVendorJs() {
	return gulp.src(files.vendor_js).pipe(
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
	return gulp
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
	test();
}

function onSassChange(event) {
	console.log(`onSassChange: ${event.path}`);
	processSass();
}

function processSass() {
	return gulp
		.src(files.sass)
		.pipe(sass({ includePaths: './node_modules' }).on('error', sass.logError))
		.pipe(gulp.dest(path.join(buildDir, 'assets')));
}

function test(done) {
	new Server(
		{
			configFile: __dirname + '/karma.conf.js',
			singleRun: true
		},
		done
	).start();
}

function testWatch(done) {
	new Server({ configFile: __dirname + '/karma.conf.js' }, done).start();
}
