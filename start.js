// start.js
// ==========================================================================
// In this file let's get the install checked and the app up and running.


// BASE SETUP
// --------------------------------------------------------------------------

var express = require('express');
var app = express();
// Set port to 3000
var port = process.env.PORT || 3000;
app.set(port)

// Check we have installed modules
// --------------------------------------------------------------------------
// Check we have a `node_modules` folder otherwise prompt an install
//

// Firstly the requires
var path = require('path')
var fs = require('fs')

// Check `node_modules` folder exists...
const nodeModulesExists = fs.existsSync(path.join(__dirname, '/node_modules'))

// ...and prompt an install if missing
if (!nodeModulesExists) {
  console.error('ERROR: Node module folder missing. Try running `npm install`')
  process.exit(0)
}



// Use Nunjucks
// ---------------------------------------------------------------------------
// Configure app to use nunjucks templating style to render views.
//

// Firstly the requires
var nunjucks = require('nunjucks');

// Location of views
var appViews = [path.join(__dirname, '/app/views/')]

// Configure nunjucks templating engine
var nunjucksAppEnv = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
})

// Set views engine
app.set('view engine', 'html')

// Routes
// ---------------------------------------------------------------------------
//

// Import routes
app.use(require('./app/routes'))


// Start server
// ---------------------------------------------------------------------------
//

// Kick start our server
app.listen(port);
// Tell us it's started
console.log('Server started on port', port);


// Gulp
// ---------------------------------------------------------------------------
//

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
