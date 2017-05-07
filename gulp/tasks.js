// tasks.js
// ============================================================================
// default watch and server

var gulp = require('gulp')
var runSequence = require('run-sequence')

module.exports = gulp.task('default', function (done) {
  runSequence(  'server',
                'watch', done)
})
