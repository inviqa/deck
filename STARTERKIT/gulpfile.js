const gulp = require('gulp');
const styles = require('./tasks/styles');

/**
 * STYLES
 */

gulp.task(styles.compile);

gulp.task(styles.lint);

gulp.task(styles.build);
