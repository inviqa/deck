const gulp = require('gulp');
const styles = require('./tasks/styles');
const fonts = require('./tasks/fonts');

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
