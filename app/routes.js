/* =========================================================================
    APP ROUTES
    ======================================================================== */

var express = require('express')
var router = express.Router()
var env = process.env.NODE_ENV | 'development'
var request = require('request')
var port = process.env.PORT

router.get('/', function(req, res) {
    res.render('index')
});

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
