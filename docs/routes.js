// routes.js
// ===========================================================================

// Routes setup
// ---------------------------------------------------------------------------
// use Router object
var fs = require('fs')
var marked = require('marked')
var path = require('path')
var express = require('express')
var router = express.Router()
var utils = require('../lib/utils.js')

// Set routes
// ---------------------------------------------------------------------------

// Home page
router.get('/', function(req, res) {
    res.render('index')
})

router.get('/install', function(req, res) {
    res.render('install')
})

// Get the markdown pages
router.get('/install/:page', function (req, res) {
  // If the link already has .md on the end (for GitHub docs)
  // remove this when we render the page
  if (req.params.page.slice(-3).toLowerCase() === '.md') {
    req.params.page = req.params.page.slice(0, -3)
  }
  redirectMarkdown(req.params.page, res)
  var doc = fs.readFileSync(path.join(__dirname,'/documentation/install/', req.params.page + '.md'),'utf8')
  var html = marked(doc)
  res.render('install_template', {'document': html})
})

// Static assets
router.use(express.static('./public'))

// Export routes
// ---------------------------------------------------------------------------
// Do not change below this line
//
// Return router to use elswhere in the app
module.exports = router

var redirectMarkdown = function (requestedPage, res) {
  if (requestedPage.slice(-3).toLowerCase() === '.md') {
    res.redirect(requestedPage.slice(0, -3))
  }
  if (requestedPage.slice(-9).toLowerCase() === '.markdown') {
    res.redirect(requestedPage.slice(0, -9))
  }
}
