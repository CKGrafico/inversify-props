// Import dependencies
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// Import configurations
const options = require('./tasks/config/options');
const _ = require('./tasks/config/helpers');

let tasks = require('require.all')('./tasks/gulp');
tasks((name, task) => { func = () => task(gulp, options.paths, $, _, options, tasks); func.displayName = name; return func});

// Configure gulp tasks
gulp.task('default', gulp.series(tasks.clean, tasks.stylesLint, tasks.styles, tasks.copy, tasks.assets));
gulp.task('watcher', gulp.parallel(tasks.watch));