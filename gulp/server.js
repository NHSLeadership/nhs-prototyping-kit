var gulp = require('gulp')
var nodemon = require('gulp-nodemon')

gulp.task('server', function () {
  nodemon({
    script: 'server.js',
    ext: 'js, json',
    //ignore: [config.paths.public + '*',
    //  config.paths.assets + '*',
    //  config.paths.nodeModules + '*']
  }).on('quit', function () {
    // remove .port.tmp if it exists
    try {
      fs.unlinkSync(path.join(__dirname, '/../.port.tmp'))
    } catch (e) {}

    process.exit(0)
  })
})
