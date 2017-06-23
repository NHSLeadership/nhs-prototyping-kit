var gulp = require('gulp')
var watch = require('gulp-watch');

var config = require('./config.json')

gulp.task('watch-sass', function () {
  return gulp.watch(
      config.paths.assets + 'sass/**',
  {cwd: './'}, ['sass-app'])
})

gulp.task('watch-assets', function () {
  return gulp.watch([
      config.paths.assets + 'images/**',
      config.paths.assets + 'javascript/**'
  ],
    {cwd: './'}, ['copy-assets'])
})
