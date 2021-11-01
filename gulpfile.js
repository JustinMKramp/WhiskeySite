const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

// Sass Task
function scssTask() {
	return src("app/css/styles.scss", { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([cssnano()]))
		.pipe(dest("dist", { sourcemaps: "." }));
}

// Javascript Task

function jsTask() {
	return src("app/js/main.js", { sourcemaps: true })
		.pipe(terser())
		.pipe(dest("dist", { sourcemaps: "." }));
}

// Browsersync Tasks

function browsersyncServe(e) {
	browsersync.init({
		server: {
			baseDir: ".",
		},
	});
	e();
}

function browsersyncReload(e) {
	browsersync.reload();
	e();
}

// Watch Task

function watchTask() {
	watch("*.html", browsersyncReload);
	watch(
		["app/css/**/*.scss", "app/js/**/*.js"],
		series(scssTask, jsTask, browsersyncReload)
	);
}

//Default Gulp Task

exports.default = series(scssTask, jsTask, browsersyncServe, watchTask);
