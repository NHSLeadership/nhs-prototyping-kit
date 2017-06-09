var basicAuth = require('basic-auth')
var config = require('../app/config.js')
var fs = require('fs')
var marked = require('marked')
var path = require('path')

exports.matchRoutes = function  (req, res)  {
  var path  = (req.params[0])
  res.render(path,  function  (err, html) {
    if  (err) {
      res.render(path + '/index', function  (err2,  html) {
        if  (err2)  {
          res.status(404).send(err  + '<br>'  + err2)
        } else  {
          res.end(html)
        }
      })
    } else  {
      res.end(html)
    }
  })
}

exports.matchMdRoutes = function (req, res) {
  var docsPath = '/../docs/documentation/'
  if (fs.existsSync(path.join(__dirname, docsPath, req.params[0] + '.md'), 'utf8')) {
    var doc = fs.readFileSync(path.join(__dirname, docsPath, req.params[0] + '.md'), 'utf8')
    var html = marked(doc)
    res.render('documentation_template', {'document': html})
    return true
  }

  return false

}

exports.findAvailablePort = function (app, callback) {
  var port = null

  try {
    port = Number(fs.readFileSync(path.join(__dirname, '/../.port.tmp')))
  } catch (e) {
    port = Number(process.env.PORT || config.port)
  }

  console.log('')
}

exports.forceHttps = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    console.log('HTTPS ONLY!')
    return res.redirect(302, 'https://' + req.get('Host') + req.url)
  }
  next()
}

exports.basicAuth = function (username, password) {
    return function (req, res, next) {
          if (!username || !password) {
                  console.log('Username or password is not set.')
                  return res.send('<h1>Error:</h1><p>Username or password not set.')
                }

          var user = basicAuth(req)

          if (!user || user.name !== username || user.pass !== password) {
                  res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
                  return res.sendStatus(401)
                }

          next()
        }
}
