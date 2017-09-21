const data = require('gulp-data');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const ignore = require('gulp-ignore');
const path = require('path');
const sass = require('gulp-sass');
const swig = require('gulp-swig');
const Server = require('karma').Server;
const through = require('through2');
const webpack = require('webpack');

const config = require('./config');
const glob = require('./utils').glob;
const webpackConfig = require('./webpack.config.js');

const buildDir = config.buildDir;
const files = config.files;

gulp.task('default', ['clean', 'copy', 'sass', 'index'], done => done());

gulp.task('clean', done => {
	del.sync([buildDir]);
	done();
});

gulp.task('copy:assets', copyAssets);

gulp.task('copy:js', copyJs);

gulp.task('copy:vendor-js', copyVendorJs);

gulp.task('copy:html', copyHtml);

gulp.task('copy', ['copy:assets', 'copy:vendor-js', 'copy:js', 'copy:html'], done => done());

gulp.task('index', ['webpack'], index);

gulp.task('sass', processSass);

gulp.task('test', ['default'], test);

gulp.task('test:watch', ['default'], testWatch);

gulp.task('webpack', webpackBuild('dev'));

gulp.task('watch', ['clean', 'copy', 'sass', 'index', 'test:watch'], () => {
	gulp.watch(files.html, onHtmlChange);
	gulp.watch(files.index, onIndexChange);
	gulp.watch(files.js, onJsChange);
	gulp.watch('src/**/*.scss', onSassChange);
});

function copyAssets(done) {
	return gulp.src(files.assets).pipe(gulp.dest(path.join(buildDir, 'assets')));
	done && done();
}

function copyHtml(done) {
	gulp
		.src(files.html)
		.pipe(ignore.exclude('**/index.html'))
		.pipe(gulp.dest(buildDir));
	done && done();
}

function copyJs(done) {
	gulp.src(files.js).pipe(gulp.dest(buildDir));
	done && done();
}

function copyVendorJs(done) {
	gulp.src(files.vendor_js).pipe(
		gulp.dest(file => {
			const src = path.resolve('./');
			const filePath = file.base.replace(src, '');
			return path.join(buildDir, filePath);
		})
	);
	done && done();
}

function index() {
	return gulp
		.src(files.index)
		.pipe(
			through.obj((file, enc, cb) => {
				const tsc = [`${buildDir}tsc/**/*.js`];
				const replaceRegex = new RegExp('^(src|' + buildDir.replace(/\/$/, '') + ')/');
				let scripts = [];
				return gulp
					.src([].concat(files.vendor_js, files.js, tsc))
					.on('end', () => {
						file.scripts = scripts;
						cb(null, file);
					})
					.pipe(
						through.obj((f1, e1, cb1) => {
							scripts = scripts.concat(f1.history.map(f2 => f2.replace(__dirname + '/', '').replace(replaceRegex, '')));
							return cb1(null, f1);
						})
					);
			})
		)
		.pipe(
			through.obj((file, enc, cb) => {
				let styles = [];
				return gulp
					.src(`${buildDir}**/*.css`)
					.on('end', () => {
						file.styles = styles;
						cb(null, file);
					})
					.pipe(
						through.obj((f1, e1, cb1) => {
							styles = styles.concat(f1.history.map(f2 => f2.replace(__dirname + '/' + buildDir, '')));
							return cb1(null, f1);
						})
					);
			})
		)
		.pipe(data(file => ({ scripts: file.scripts, styles: file.styles })))
		.pipe(swig())
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
	copyJs(() => test());
}

function onSassChange(event) {
	console.log(`onSassChange: ${event.path}`);
	processSass();
}

function processSass(done) {
	gulp
		.src(files.sass)
		.pipe(sass({ includePaths: './node_modules' }).on('error', sass.logError))
		.pipe(gulp.dest(path.join(buildDir, 'assets')));
	done && done();
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

function webpackBuild(buildType) {
	let config = Object.create(webpackConfig);
	const compiler = webpack(config);
	return done => {
		compiler.run((err, stats) => {
			if (err) {
				throw new gutil.PluginError(`webpack:build:${buildType}`, err);
			}
			gutil.log(`[webpack:build:${buildType}]`, stats.toString({ colors: true }));
			done && done();
		});
	};
}
