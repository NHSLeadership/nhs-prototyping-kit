var gulp = require('gulp')
var config = require('./config.json')

gulp.task('copy-toolkit', function () {
    return gulp.src(['node_modules/nightingale/**'])
    .pipe(gulp.dest(config.paths.includes + '/nightingale/'))
})
