// watch.js
// ============================================================================
// chokidar: watch for ./app changes and clear cache, reload from orig

// requires
var gulp = require('gulp')
var chokidar = require('chokidar')

// Start watch on ./app
var watcher = chokidar.watch('./app',
                            {persistent: true})

gulp.task('watch', function () {
    watcher.on('ready', function() {
        watcher.on('all', function() {
                console.log("Clearing /dist/ module cache from server")
                Object.keys(require.cache).forEach(function(id) {
                    if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id]
                })
                gulp.start('re-generate-custom-assets')
                // TODO : This needs to be a bit more specific about what is re-generated
            })
        })
    })
