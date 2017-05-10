// start.js
// ==========================================================================
// In this file let's get the install checked and the app up and running.

// Check we have installed modules
// --------------------------------------------------------------------------
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

// Check we have a `nightingale` submodule otherwise prompt a pull
// Check `nightingale` folder exists...
const nightingaleExists = fs.existsSync(path.join(__dirname, '/lib/nightingale'))

// ...and get if missing
if (!nightingaleExists) {
  console.error('ERROR: Nightingale submodule missing.')
  // Try to get submodule
  var sys = require('sys')
  var exec = require('child_process').exec;
  function puts(error, stdout, stderr) { sys.puts(stdout) }

  console.info('Adding Nightingale submodule')
  exec("git submodule add -f git://github.com/NHSLeadership/nightingale.git lib/nightingale", puts);
  console.info('Please restart the app')
  process.exit(0)
}

// Check we have main.sass in `/nightingale`
const nightingaleHasSass = fs.existsSync('lib/nightingale/main.sass')
// ...and prompt if missing
if (!nightingaleHasSass) {
  console.error('ERROR: Nightingale seems to be empty.')
  console.info('Delete this app and clone a fresh copy with: ')
  console.info('git clone https://github.com/NHSLeadership/nhs-prototyping-kit.git')
  process.exit(0)
}


// Gulp
// ---------------------------------------------------------------------------
//

// Requires to sport node async scripts
var spawn = require('cross-spawn')
// Colour set for errors
process.env['FORCE_COLOR'] = 1

// Gulp
var gulp = spawn('gulp')

// Catch errors
gulp.stdout.pipe(process.stdout)
gulp.stderr.pipe(process.stderr)
process.stdin.pipe(gulp.stdin)

// Report errors
gulp.on('exit', function (code) {
  console.log('gulp exited with code ' + code.toString())
})
