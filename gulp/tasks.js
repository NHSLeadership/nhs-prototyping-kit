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
                'generate-assets',
                'server',
                'watch',
                done
            )
})

module.exports = gulp.task('generate-assets', function (done) {
  runSequence(
                'sass',
                'custom-sass',
                //'assets',
                //'custom-assets',
                done
            )
})
