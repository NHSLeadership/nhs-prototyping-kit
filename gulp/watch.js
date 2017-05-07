var gulp = require('gulp')
var chokidar = require('chokidar')
var watcher = chokidar.watch('./')

gulp.task('watch', function () {

    watcher.on('ready', function() {
        watcher.on('all', function() {
                console.log("Clearing /dist/ module cache from server")
                Object.keys(require.cache).forEach(function(id) {
                    if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id]
                })
            })
        })
    })
