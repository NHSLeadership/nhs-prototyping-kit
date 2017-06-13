/*  ========================================================================
    DOCUMENTATION ROUTES
    ======================================================================= */

var express = require('express')
var fs = require('fs')
var marked = require('marked')
var path = require('path')
var router = express.Router()
var utils = require('../lib/utils.js')

router.get('/', function (req, res) {
  res.render('index')
})

router.get('/install', function (req, res) {
  res.render('install')
})

router.get('/install/:page', function (req, res) {
  if (req.params.page.slice(-3).toLowerCase() === '.md') {
    req.params.page = req.params.page.slice(0, -3)
  }
  redirectMarkdown(req.params.page, res)
  var doc = fs.readFileSync(path.join(__dirname, '/documentation/install/', req.params.page + '.md'), 'utf8')
  var html = marked(doc)
  res.render('install_template', {'document': html})
})

router.post('/tutorials-and-examples', function (req, res) {
  res.redirect('tutorials-and-examples')
})


router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', { 'name': 'Foo' })
})


module.exports = router

var redirectMarkdown = function (requestedPage, res) {
  if (requestedPage.slice(-3).toLowerCase() === '.md') {
    res.redirect(requestedPage.slice(0, -3))
  }
  if (requestedPage.slice(-9).toLowerCase() === '.markdown') {
    res.redirect(requestedPage.slice(0, -9))
  }
}
