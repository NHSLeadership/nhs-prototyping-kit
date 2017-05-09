// server.js
// ==========================================================================
// In this file let's get the install checked and the app up and running.


// BASE SETUP
// --------------------------------------------------------------------------

var express = require('express')
var packageJson = require('./package.json')
var app = express()


// Set port to 3000
var port = process.env.PORT || 3000;
app.set(port)


// Use Nunjucks
// ---------------------------------------------------------------------------
// Configure app to use nunjucks templating style to render views.
//

// Firstly the requires
var nunjucks = require('nunjucks')

// Location of views
var appViews = './app/views/'

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
var releaseVersion = packageJson.version
var description = packageJson.description
console.log('\n' + description + ' v' + releaseVersion)
console.log('Server started at : http://localhost:' + port)
