//=============================================================================
// # Start
//=============================================================================
// In this file let's get the install checked and the app up and running.

// Check we have installed modules
// =============================================================================
// Check we have a `node_modules` folder otherwise prompt an install
//
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




var express = require('express');
var nunjucks = require('nunjucks');

var app = express();

// Setup nunjucks templating engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('port', process.env.PORT || 3000);

// Home page
app.get('/', function(req, res) {
    res.render('index.html', {
        page: 'home',
        port: app.get('port')
    });
});

// Kick start our server
app.listen(app.get('port'), function() {
    console.log('Server started on port', app.get('port'));
});
