/* ==========================================================================
 * server.js
 * The main server file. This is where most things are defined.
 * ==========================================================================
 */
// Define Variables, Scopes and Environments below:

// Requirements
require('dotenv').config()
var path                 = require('path') // NodeJS path module
var express              = require('express') // Main Web Framework
var nunjucks             = require('nunjucks') // Templating Engine
var routes               = require('./app/routes.js') // Application
var documentationRoutes  = require('./docs/routes.js') // Documentation
var app                  = express()
var documentationApp     = express()
var config               = require('./app/config.js') // Main config
var utils                = require('./lib/utils.js')
var packageJson          = require('./package.json')

// Environments
var releaseVersion = packageJson.version
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'development'
var phaseBanner = process.env.PHASE_BANNER || config.phaseBanner
var useDocumentation = (config.useDocumentation === 'true')

/**==========================================================================
 * Define Routes, Endpoints, Paths below:
 * ==========================================================================
 */

// Routes setup
var appViews = './app/views/'
var appRoutes = './app/routes'
var templateViews = './lib/template/views/'

// Setup nunjucks for application
var nunjucksAppEnv = nunjucks.configure([appViews, templateViews], {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
})

// Set views engine
app.set('view engine', 'html')

// Middleware for serving static sites/files
app.use('./public', express.static(path.join(__dirname, './public')))
app.use('./public', express.static(path.join(__dirname, './node_modules/nightingale/assets')))

if (useDocumentation) {
  docsApp.locals = app.locals

  app.use('/docs', docsApp)

  docsApp.use('/', docRoutes)

  docsApp.get(/^\/([^.]+)$/, function (req, res) {
    if (!utils.matchMdRoutes(req, res)) {
      utils.matchRoutes(req, res)
    }
  })
}

/**
 * #SEO Related
 */

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

app.locals.asset_path = '/public/'
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
