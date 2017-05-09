// copy.js
// ============================================================================
// Copy images and javascript folders into ./public
//

var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var runSequence = require('run-sequence')

// Some config vars to save re-typing
var config = require('./config.json')

// Copy Nightingale assets
gulp.task('assets-js', function () {
  gulp.src(config.paths.nightingale + 'assets/javascript/**/*.js')
  .pipe(gulp.dest(config.paths.public))
})

gulp.task('assets-fonts', function () {
    gulp.src(config.paths.nightingale + 'assets/fonts/**/*.{ttf,woff,eof,svg}')
  .pipe(gulp.dest(config.paths.public + 'fonts'))
})

gulp.task('assets-images', function () {
  gulp.src(config.paths.nightingale + '**/*.{png,jpg,jpeg,svg}')
  .pipe(gulp.dest(config.paths.public + 'images'))
})

// Copy custom assets
gulp.task('custom-assets-js', function () {
  gulp.src(config.paths.appAssets + '/**/*.js')
  .pipe(gulp.dest(config.paths.public))
})

gulp.task('custom-assets-fonts', function () {
  gulp.src(config.paths.appAssets + 'assets/fonts/**/*.{ttf,woff,eof,svg}')
  .pipe(gulp.dest(config.paths.public + 'fonts'))
})

gulp.task('custom-assets-images', function () {
  gulp.src(config.paths.appAssets + '**/*.{png,jpg,jpeg,svg}')
  .pipe(gulp.dest(config.paths.public + 'images'))
})

// Regenerate only custom assets
gulp.task('re-generate-custom-assets', function (done) {
  runSequence(
                'custom-sass',
                'custom-assets-js',
                'custom-assets-fonts',
                'custom-assets-images',
                done
            )
    })
