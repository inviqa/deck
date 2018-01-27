const gulp = require('gulp');
const styles = require('./tasks/styles');
const fonts = require('./tasks/fonts');
const images = require('./tasks/images');

/**
 * STYLES
 */

gulp.task(styles.compile);
gulp.task(styles.lint);
gulp.task(styles.build);

/**
 * FONTS
 */

gulp.task(fonts);

/**
 * IMAGES
 */

gulp.task(images);
