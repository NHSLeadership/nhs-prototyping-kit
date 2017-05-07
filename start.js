/** ===========================================================================
*   # Start
*   ===========================================================================
*   In this file let's get the install checked and the app up and running.
*/


/** Check we have installed modules
*   ---------------------------------------------------------------------------
*   Check we have a `node_modules` folder otherwise prompt an install
*/

// Firstly the requires
var path = require('path')
var fs = require('fs')

// Check `node_modules` folder exists...
const nodeModulesExists = fs.existsSync(path.join(__dirname, '/node_modules'))

// ...and prompt an install if missing
if (!nodeModulesExists) {
  console.error('ERROR: Node module folder missing. Try running `npm install`')
  process.exit(0)
}



/** Use Nunjucks
*   ---------------------------------------------------------------------------
*   Configure app to use nunjucks templating style to render views.
*/

// Firstly the requires
var express = require('express');
var nunjucks = require('nunjucks');

var app = express();

// Setup nunjucks templating engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});


/** Start server
*   ---------------------------------------------------------------------------
*   set ports and GO
*/

// Set ports
app.set('port', process.env.PORT || 3000);

// Kick start our server
app.listen(app.get('port'), function() {
    console.log('Server started on port', app.get('port'));
});

// TODO : this needs putting in a server.js


/** Routes
*   ---------------------------------------------------------------------------
*   Decide the content served from the URL
*/

// Home page
app.get('/', function(req, res) {
    res.render('index.html', {
        // Pass variables
        page: 'Home',
        port: app.get('port')
    });
});

// TODO : this needs putting in a routes.js
