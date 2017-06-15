var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var runSequence = require('run-sequence')

// Some config vars to save re-typing
var config = require('./config.json')

// Copy Nightingale assets
gulp.task('copy-assets', function (done) {
  runSequence(
    'assets-fonts',
    'assets-images',done);
})

gulp.task('assets-fonts', function () {
      gulp.src(config.paths.nightingale + 'assets/fonts/*.{ttf,woff,woff2,eot,eof,svg}')
    .pipe(gulp.dest(config.paths.public + 'fonts'))
})

gulp.task('assets-images', function () {
    gulp.src(config.paths.nightingale + 'assets/img/*.{png,jpg,jpeg,svg}')
    .pipe(gulp.dest(config.paths.public + 'images'))
})
