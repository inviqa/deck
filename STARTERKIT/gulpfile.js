const gulp = require('gulp');
const styles = require('./tasks/styles');
const fonts = require('./tasks/fonts');
const images = require('./tasks/images');
const scripts = require('./tasks/scripts');

gulp.task(styles.compile);
gulp.task(styles.lint);
gulp.task(styles.build);

gulp.task(scripts.compile);
gulp.task(scripts.lint);
gulp.task(scripts.build);

gulp.task(fonts);
gulp.task(images);
