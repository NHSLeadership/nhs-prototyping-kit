var gulp = require('gulp')
var runSequence = require('run-sequence')

gulp.task('default', function (done) {
  runSequence('generate-assets',
                'watch',
                'server', done)
})

gulp.task('generate-assets', function (done) {
  runSequence('clean',
                'sass-app',
                'sass-documentation',
                'copy-assets', done)
})

gulp.task('watch', function () {
  runSequence('watch-sass',
               'watch-assets')
})
