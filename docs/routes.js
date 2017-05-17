// routes.js
// ===========================================================================

// Routes setup
// ---------------------------------------------------------------------------
// use Router object
var express = require('express')
var router = express.Router()

// Set routes
// ---------------------------------------------------------------------------

// Home page
router.get('/', function(req, res) {
    res.render('index')
})

router.get('/install', function(req, res) {
    res.render('install')
})

// Static assets
router.use(express.static('./public'))

// Export routes
// ---------------------------------------------------------------------------
// Do not change below this line
//
// Return router to use elswhere in the app
module.exports = router
