const gulp = require('gulp');
const eslint = require('gulp-eslint');

const lint = function () {
  return gulp.src('./assets/src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
};

lint.displayName = 'scripts:lint';

const build = gulp.series(
  lint,
);

build.displayName = 'scripts';

module.exports = {
  lint,
  build
};
