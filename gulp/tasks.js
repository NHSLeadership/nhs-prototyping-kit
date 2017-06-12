// tasks.js
// ============================================================================
// Gulp task sequence: server and app watch
//

// requires gupl and gulp sequencer
var gulp = require('gulp')
var runSequence = require('run-sequence')

// export to app gulp task responce
gulp.task('default', function (done) {
    // run sequence
    runSequence(
                'generate-assets',
                'server',
                'watch',
                done
            )
})

gulp.task('generate-assets', function () {
  runSequence(
                'copy-nightingale',
                'sass',
                'sass-documentation',
                'copy-assets',
                'copy-documentation-assets')
  process.exit(0);
})

gulp.task('copy-nightingale', [
  'copy-toolkit'
])
