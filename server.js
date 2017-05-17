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
var config      = require('./app/config.js') // App's config
var app         = express() // The designer's app
var docsApp     = express() // The docs sub app


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

// Location of views and routes
var appViews = './app/views/'
var appRoutes = './app/routes'
var nhsViews = './lib/template/views/'
var docsAppViews = './docs/views/'
var docsAppRoutes = './docs/routes'

// Configure nunjucks templating engine

 var nunjucksAppEnv = nunjucks.configure([appViews, nhsViews], {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
})

var nunjucksDocsAppEnv = nunjucks.configure([docsAppViews, nhsViews], {
  autoescape: true,
  express: docsApp,
  noCache: true,
  watch: true
})

// Nunjucks filters
/**
utils.addNunjucksFilters(nunjucksAppEnv)
utils.addNunjucksFilters(nunjucksDocsAppEnv)
*/

// Set views engine
app.set('view engine', 'html')
docsApp.set('view engine', 'html')

/**
 * #ROUTES
 * ==========================================================================
 */

// Import routes
app.use(require(appRoutes))
app.use('./public', express.static(path.join(__dirname, './public')))

// Mount the sub-app
app.use('/docs', docsApp)
// Docs app under the /docs namespace
//docsApp.use('/', docsAppRoutes)
docsApp.use(require(docsAppRoutes))

// Remove Indexing
app.use(function (req, res, next) {
  res.setHeader('X-Robots-Tag', 'noindex')
  next()
})

app.get('/robots.txt', function (req, res) {
  res.type('text/plain')
  res.send('User-agent: * \nDisallow: /')
})

// Strip the .html from the request.
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
docsApp.locals.asset_path = app.locals.asset_path // Documentation app locals copy app locals
// In-app variables
app.locals.serviceName = config.serviceName
app.locals.prototypeVersion = config.prototypeVersion
app.locals.releaseVersion = packageJson.version
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
