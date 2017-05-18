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
