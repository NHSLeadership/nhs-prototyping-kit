/* ========================================================================
   SERVER
   ======================================================================== */

/*
 * The main file we call when deploying, controls everything from variables,
 * environments and interacts with the express router via middleware.
 */

require('dotenv').config()
var path                 = require('path') // NodeJS path module
var express              = require('express') // Main Web Framework
var nunjucks             = require('nunjucks') // Templating Engine
var routes               = require('./app/routes.js') // Application
var documentationRoutes  = require('./docs/documentation_routes.js') // Documentation
var app                  = express()
var documentationApp     = express()
var config               = require('./app/config.js') // Main config
var utils                = require('./lib/utils.js') // Utils
var packageJson          = require('./package.json')

// Environment

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

var isSecure = (env === 'production' && useHttps === 'true')

if (isSecure) {
  app.use(utils.forceHttps)
  app.set('trust proxy',1)
}

if (env === 'production' && useAuth === 'true') {
    app.use(utils.basicAuth(username, password))
}

var appViews = [path.join(__dirname, '/app/views/'), path.join(__dirname, '/lib/'), path.join(__dirname, '/lib/template/views/')]

var nunjucksAppEnv = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
})

app.set('view engine', 'html')

/*
 * Middleware for serving static files, we're serving /assets/fonts rahter than
 * /public/fonts because nightingale currently has strict rules aroudn this.
 */
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/public', express.static(path.join(__dirname, '/node_modules/nightingale/assets')))
app.use('/assets/fonts', express.static(path.join(__dirname, '/node_modules/nightingale/assets/fonts')))


if (useDocumentation) {
  var documentationViews = [path.join(__dirname, '/docs/views/'), path.join(__dirname, '/lib/'), path.join(__dirname, '/lib/template/views/')]

  var nunjucksDocumentationEnv = nunjucks.configure(documentationViews, {
    autoescape: true,
    express: documentationApp,
    noCache: true,
    watch: true
  })

  documentationApp.set('view engine', 'html')
}


app.locals.asset_path     = '/public/'
app.locals.cookieTest     = config.cookieText
app.locals.releaseVersion = 'v' + releaseVersion
app.locals.serviceName    = config.serviceName
app.locals.promoMode      = promoMode


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

app.get(/\.html?$/i, function (req, res) {
  var path = req.path
  var parts = path.split('.')
  parts.pop()
  path = parts.join('.')
  res.redirect(path)
})

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
  documentationApp.get(/^\/([^.]+)$/, function (req, res) {
    if (!utils.matchMdRoutes(req, res)) {
      utils.matchRoutes(req, res)
    }
  })
}

var server = app.listen(port, function () {

      var host = server.address().address

      console.log('Prototyping Kit listening at http://%s:%s', host, port)

})

var releaseVersion = packageJson.version
var description = packageJson.description

module.exports = app
