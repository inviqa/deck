const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('gulp-stylelint');
const stylelintFormatter = require('stylelint-formatter-pretty');

const stylesSrc = './assets/src/styles/**/*.scss';

const compile = function () {
  return gulp.src(stylesSrc)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/dist/styles'));
};

compile.displayName = 'styles:compile';

const lint = function () {
  return gulp.src(stylesSrc)
    .pipe(stylelint({
      reporters: [ {
        formatter: stylelintFormatter,
        console: true
      } ]
    }));
};

lint.displayName = 'styles:lint';

const build = gulp.series(
  lint,
  compile,
);

build.displayName = 'styles';

module.exports = {
  compile,
  lint,
  build,
};
