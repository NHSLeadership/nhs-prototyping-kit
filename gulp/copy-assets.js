// copy.js
// ============================================================================
// Copy images and javascript folders into ./public
//

var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')

// Some config vars to save re-typing
var config = require('./config.json')

// Copy Nightingale assets
gulp.task('assets', function () {
  return gulp.src(['!' + config.paths.nightingale + 'sass{,/**/*}',
    config.paths.nightingale + '/**'])
  .pipe(gulp.dest(config.paths.public))
})

// Copy custom assets
gulp.task('custom-assets', function () {
  return gulp.src(['!' + config.paths.appAssets + 'sass{,/**/*}',
    config.paths.appAssets + '/**'])
  .pipe(gulp.dest(config.paths.public))
})
