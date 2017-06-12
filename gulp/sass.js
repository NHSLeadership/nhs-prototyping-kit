// sass.js
// ============================================================================
// gulp-sass: convert Nightingale SCSS to CSS and place in ./app/assets
//

var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')

// Some config vars to save re-typing
var config = require('./config.json')

// Let's get Sassy
gulp.task('sass', function () {
    return gulp.src(config.paths.assets + '/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded',
          includePaths: ['nightingale/']}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.public + '/stylesheets/'))
})

gulp.task('sass-documentation', function () {
  return gulp.src(config.paths.docsAssets + '/sass/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded',
    includePaths: 'nightingale/'}).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.paths.public + '/stylesheets/'))
})
