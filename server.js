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
var documentationRoutes  = require('./docs/documentation_routes.js') // Documentation
var app                  = express()
var documentationApp     = express()
var config               = require('./app/config.js') // Main config
var utils                = require('./lib/utils.js')
var packageJson          = require('./package.json')

// Environments

var releaseVersion = packageJson.version
var env = process.env.NODE_ENV || 'development'
var useDocumentation = (config.useDocumentation === 'true')
var promoMode = process.env.PROMO_MODE || 'false'
var username = process.env.USERNAME
var password = process.env.PASSWORD
var useHttps = process.env.USE_HTTPS || config.useHttps
var useAuth = process.env.USE_AUTH || config.useAuth
var port  = process.env.PORT  || config.port

env = env.toLowerCase()
useHttps = useHttps.toLowerCase()
promoMode = promoMode.toLowerCase()
useAUth = useAuth.toLowerCase()

if (!useDocumentation) promoMode = 'false'

/**==========================================================================
 * Define Routes, Endpoints, Paths below:
 * ==========================================================================
 */

var isSecure = (env === 'production' && useHttps === 'true')

if (isSecure) {
  app.use(utils.forceHttps)
  app.set('trust proxy',1)
}

if (env === 'production' && useAuth === 'true') {
    app.use(utils.basicAuth(username, password))
}

// Paths setup
var appViews = [path.join(__dirname, '/app/views/'), path.join(__dirname, '/lib/'), path.join(__dirname, '/lib/template/views/')]

// Setup nunjucks for application
var nunjucksAppEnv = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
})

// Set views engine
app.set('view engine', 'html')

// Middleware for serving static sites/files
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/public', express.static(path.join(__dirname, '/node_modules/nightingale/assets')))

// Setup documentation application

if (useDocumentation) {
  var documentationViews = [path.join(__dirname, '/docs/views/'), path.join(__dirname, '/lib/'), path.join(__dirname, '/lib/template/views/')]

  var nunjucksDocumentationEnv = nunjucks.configure(documentationViews, {
    autoescape: true,
    express: documentationApp,
    noCache: true,
    watch: true
  })

  // Set views engine
  documentationApp.set('view engine', 'html')
}

/**==========================================================================
 * Define varliables across views
 * ==========================================================================
 */


app.locals.asset_path     = '/public/'
app.locals.cookieTest     = config.cookieText
app.locals.releaseVersion = 'v' + releaseVersion
app.locals.serviceName    = config.serviceName
app.locals.promoMode      = promoMode

/**==========================================================================
 * Define SEO and Route niceties and others.s
 * ==========================================================================
 */

if (promoMode === 'true') {
  console.log('Prototype kit running in promo mode')

  app.get('/', function (req, res) {
    res.redirect('/docs')
  })

  app.get('/robots.txt', function (req, res) {
    res.type('text/plain')
    res.send('User-agent: *\nAllow: /')
  })
} else {
  app.use(function (req, res, next) {
    res.setHeader('X-Robots-Tag', 'noindex')
    next()
  })

  app.get('/robots.txt', function (req, res) {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /')
  })
}

if (typeof (routes) !== 'function') {
  console.log(routes.bind)
  console.log('Warning: the use of bind in routes is deprecated - please check the prototype kit documentation for writing routes.')
  routes.bind(app)
} else {
  app.use('/', routes)
}

// Strip the .html from the request.
app.get(/\.html?$/i, function (req, res) {
  var path = req.path
  var parts = path.split('.')
  parts.pop()
  path = parts.join('.')
  res.redirect(path)
})

// Documentation check
if (useDocumentation) {
  documentationApp.locals = app.locals
  app.use('/docs', documentationApp)
  documentationApp.use('/', documentationRoutes)
}

app.get(/\.html?$/i, function (req, res) {
  var path = req.path
  var parts = path.split('.')
  parts.pop()
  path = parts.join('.')
  res.redirect(path)
})

app.get(/^\/([^.]+)$/, function (req, res) {
  utils.matchRoutes(req, res)
})

if (useDocumentation) {
  // Documentation  routes
  documentationApp.get(/^\/([^.]+)$/, function (req, res) {
    if (!utils.matchMdRoutes(req, res)) {
      utils.matchRoutes(req, res)
    }
  })
}

// Kick start our server
app.listen(port)
console.log('Listening on port ' + port + ' url: https://nhs-prototyping-kit.herokuapp.com:' + port)

// Tell us it's started
var releaseVersion = packageJson.version
var description = packageJson.description
console.log('\n' + description + ' v' + releaseVersion)

module.exports = app
