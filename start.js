/**
 * ========================================================================
 * #START.JS
 * In this file let's get the install checked and the app up and running.
 */

var path = require('path')
var fs = require('fs')

// Check we have a `node_modules` folder otherwise prompt an install
const nodeModulesExists = fs.existsSync(path.join(__dirname, './node_modules'))
if (!nodeModulesExists) {
  console.error('ERROR: Node module folder missing. Try running `npm install`')
  process.exit(0)
}

const envExists = fs.existsSync(path.join(__dirname, '/.env'))
if (!envExists) {
  console.log('Creating template .env file')
    fs.createReadStream(path.join(__dirname, './lib/template.env'))
    .pipe(fs.createWriteStream(path.join(__dirname, '/.env')))
}

/**
 * #GULP
 * ========================================================================
 */

// Requires to sport node async scripts
var spawn = require('cross-spawn')
// Colour set for errors
process.env['FORCE_COLOR'] = 1

// Gulp
var gulp = spawn('gulp')

// Catch errors
gulp.stdout.pipe(process.stdout)
gulp.stderr.pipe(process.stderr)
process.stdin.pipe(gulp.stdin)

// Report errors
gulp.on('exit', function (code) {
  console.log('gulp exited with code ' + code.toString())
})
