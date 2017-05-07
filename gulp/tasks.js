// tasks.js
// ============================================================================
// Gulp task sequence: server and app watch
//

// requires gupl and gulp sequencer
var gulp = require('gulp')
var runSequence = require('run-sequence')

// export to app gulp task responce
module.exports = gulp.task('default', function (done) {
    // run sequence
    runSequence(
                'server',
                'watch',
                done)
})
