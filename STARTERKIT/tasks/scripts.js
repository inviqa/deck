const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const PluginError = require('plugin-error');

const lint = function () {
  return gulp.src('./assets/src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
};

lint.displayName = 'scripts:lint';

const compile = function (done) {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new PluginError('scripts:compile', err);
    }

    console.log(stats.toString({
      chunks: false,  // Makes the build much quieter
      colors: true    // Shows colors in the console
    }));

    done();
  });
};

compile.displayName = 'scripts:compile';

const build = gulp.series(
  lint,
  compile,
);

build.displayName = 'scripts';

module.exports = {
  lint,
  compile,
  build
};
