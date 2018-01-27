const gulp = require('gulp');

const fonts = function () {
  return gulp.src('./assets/src/fonts/**/*.{eot,ttf,woff,woff2,otf,svg}')
    .pipe(gulp.dest('./assets/dist'));
};

fonts.displayName = 'fonts';

module.exports = fonts;
