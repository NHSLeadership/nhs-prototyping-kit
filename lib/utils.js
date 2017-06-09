var config = require('../app/config.js')
var fs = require('fs')
var marked = require('marked')
var path = require('path')

exports.addNunjucksFilters = function (env) {
  var coreFilters = require('./core_filters.js')(env)
  var customFilters = require('../app/filters.js')(env)
  var filters = Object.assign(coreFilters, customFilters)
    Object.keys(filters).forEach(function (filterName) {
    env.addFilter(filterName, filters[filterName])
  })
  return
}

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


