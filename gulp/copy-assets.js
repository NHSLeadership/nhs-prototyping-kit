/** ============================================================================
 *  copy.js
 *  ============================================================================
 */

// Copy images and javascript folders into ./public

var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var runSequence = require('run-sequence')

// Some config vars to save re-typing
var config = require('./config.json')

gulp.task('copy-assets', function () {
    return gulp.src(['!' + config.paths.assets + 'sass{,/**/*}',
          config.paths.assets + '/**'])
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-documentation-assets', function () {
    return gulp.src(['!' + config.paths.docsAssets + 'sass{,/**/*}',
          config.paths.docsAssets + '/**'])
    .pipe(gulp.dest(config.paths.public))
})
