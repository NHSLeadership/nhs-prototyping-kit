var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var runSequence = require('run-sequence')

// Some config vars to save re-typing
var config = require('./config.json')

// Copy Nightingale assets
gulp.task('copy-assets', function (done) {
  runSequence(
    'nightingale-assets-images',
    'app-assets-javascript',
    'app-assets-images',done);
})

gulp.task('nightingale-assets-images', function () {
    gulp.src(config.paths.nightingale + 'assets/img/**/*.{png,jpg,jpeg,svg}')
    .pipe(gulp.dest(config.paths.public + 'images'))
})

gulp.task('app-assets-javascript', function () {
      gulp.src(config.paths.assets + 'javascript/*.{js}')
    .pipe(gulp.dest(config.paths.public + 'javascript'))
})

gulp.task('app-assets-images', function () {
    gulp.src(config.paths.assets + 'img/*.{png,jpg,jpeg,svg}')
    .pipe(gulp.dest(config.paths.public + 'images'))
})
