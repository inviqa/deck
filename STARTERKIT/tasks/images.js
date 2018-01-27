const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

const config = [
  imagemin.gifsicle({
    interlaced: true,
  }),
  imagemin.jpegtran({
    progressive: true,
  }),
  imagemin.optipng({
    optimizationLevel: 5
  }),
  imagemin.svgo({
    plugins: [
      {removeViewBox: true},
      {cleanupIDs:true},
      {cleanupAttrs: true},
    ]
  })
];

const compress = function () {
  gulp.src('./assets/src/images/**/*')
    .pipe(imagemin(config))
    .pipe(gulp.dest('./assets/dist'));
};

compress.displayName = 'images';

module.exports = compress;
