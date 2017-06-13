// routes.js
// ===========================================================================

// Routes setup
// ---------------------------------------------------------------------------
// use Router object

var express = require('express')
var router = express.Router()
var env = process.env.NODE_ENV | 'development'
var request = require('request')
var port = process.env.PORT

// Set routes
// ---------------------------------------------------------------------------

// Home page
router.get('/', function(req, res) {
    res.render('index')
});

router.get('/assets/fonts/:name', function(req,res) {
  request('https://' + req.hostname + '/public/fonts/' + req.params.name).pipe(res);
})

// CUSTOM ROUTES HERE
// Page-name
// router.get('/page-name', function(req, res) {
//     res.render('page-name')
// });


// Export routes
// ---------------------------------------------------------------------------
// Do not change below this line
//
// Export router to use elswhere in the app
module.exports = router
