const gulp = require('gulp');

const fonts = function () {
  gulp.src('./assets/src/fonts/**/*.{eot,ttf,woff,woff2,otf,svg}')
    .dest('./assets/dist');
};

fonts.displayName = 'fonts';

module.exports = fonts;
