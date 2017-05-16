/* ==========================================================================
 * #SERVER.JS
 * In this file let's get the install checked and the app up and running.
 * ==========================================================================
 */

/**
 * #BASE
 * ==========================================================================
 */

var express     = require('express')
var path        = require('path')
var packageJson = require('./package.json')
var app         = express()


// Set port to 3000
var port = process.env.PORT || 3000;
app.set(port)


/**
 * #NUNJUCKS
 * Configure app to use nunjucks templating style to render views.
 * ==========================================================================
 */

// Firstly the requires
var nunjucks = require('nunjucks')

// Location of views
var appViews = './app/views/'
var nhsViews = './lib/template/views/'

// Configure nunjucks templating engine
var nunjucksAppEnv = nunjucks.configure([appViews, nhsViews], {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
})

// Set views engine
app.set('view engine', 'html')

/**
 * #ROUTES
 * ==========================================================================
 */

// Import routes
app.use(require('./app/routes'))
app.use('./public', express.static(path.join(__dirname, './public')))
app.use('./assets', express.static(path.join(__dirname, './node_modules/nightingale/assets')))

// Remove Indexing
app.use(function (req, res, next) {
  res.setHeader('X-Robots-Tag', 'noindex')
  next()
})

app.get('/robots.txt', function (req, res) {
  res.type('text/plain')
  res.send('User-agent: *\Disallow: /')
})

// Stip .html
app.get(/\.html?$/i, function (req, res) {
  var path = req.path
  var parts = path.split('.')
  parts.pop()
  path = parts.join('.')
  res.redirect(path)
})

/**
 * #VARIABLES
 */

app.locals.asset_path = './public/'

/**
 * #START
 * ==========================================================================
 */

// Kick start our server
app.listen(port);
// Tell us it's started
var releaseVersion = packageJson.version
var description = packageJson.description
console.log('\n' + description + ' v' + releaseVersion)
console.log('Server started at : http://localhost:' + port)
