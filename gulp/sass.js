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
gulp.task('sass', function(){
    // Nightingale
  return gulp.src(config.paths.nightingale + 'main.scss')
    // Gulp-sass: Convert Sass to CSS
    .pipe(sass({outputStyle:  'expanded',
      includePaths: 'node_modules/nightingale/node_modules/'}).on('error', sass.logError))
    // Output CSS destination
    .pipe(gulp.dest(config.paths.public + 'stylesheets/')
)
});

gulp.task('sass-documentation', function () {
  return gulp.src(config.paths.docsAssets + '/sass/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded',
    includePaths: 'node_modules/nightingale/'}).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.paths.public + '/stylesheets/'))
})
