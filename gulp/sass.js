var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')

var config = require('./config.json')

gulp.task('sass-app', function () {
  return gulp.src(config.paths.assets + 'sass/*.{css,sass,scss}',)
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
    includePaths: './node_modules'
  }).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.paths.public + '/stylesheets/'))
})

gulp.task('sass-documentation', function () {
  return gulp.src(config.paths.nightingale + '*.{css,sass,scss}')
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
    includePaths: "./node_modules"
  }).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.paths.public + '/stylesheets/'))
})
