/*
  sass.js
  ===========
  compiles sass from assets folder with the govuk_modules
  also includes sourcemaps
*/

var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var rename = require('gulp-rename')

var config = require('./config.json')

gulp.task('sass', function () {
  return gulp.src(config.paths.nightingale + '*.{css,scss}')
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths:[
      "./node_modules/sass-mq",
      "./node_modules/normalize-scss/sass"
    ],
    outputStyle: 'expanded'
  }).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.paths.public + '/stylesheets/'))
})

gulp.task('components', function() {
    return gulp.src(['node_modules/normalize.css/normalize.css'])
    .pipe(rename('_normalize.scss'))
    .pipe(gulp.dest(config.paths.nodeModules + '/normalize.css/'));
})

gulp.task('sass-documentation', function () {
  return gulp.src(config.paths.nightingale + '*.{css,scss}')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded',
    includePaths: [
      "./node_modules/sass-mq",
      "./node_modules/normalize-scss/sass"
    ]
  }).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.paths.public + '/stylesheets/'))
})
