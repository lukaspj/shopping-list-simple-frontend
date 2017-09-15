var server = require('pushstate-server');
var { spawn } = require('child_process');

var isWin = /^win/.test(process.platform);

var env = Object.create(process.env);

if (!isWin) {
  env.HOME = '/';

  // The above 'HOME=/' is necessary in order to deploy with a Heroku buildscript,
  // it seems to prevent an issue where a 'angular-cli.json' file is corrupting the,
  // build process.
}

var build_process = spawn(isWin ? 'ng.cmd' : 'ng', ['build', '--prod', '--aot']);

build_process.stdout.pipe(process.stdout);
build_process.stderr.pipe(process.stderr);
build_process.on('error', err => {
  console.log(`Build process failed, error: ${JSON.stringify(err)}`)
});
build_process.on('close', code => {
  if (code === 0) {
    console.log('Starting server on port 8080..');
    server.start({
      port: 8080,
      directory: './dist'
    }, (err, address) =>{
      if (err) {
        console.log(`An error occured, trying to start the server. Error: ${JSON.stringify(err)}`);
      } else {
        console.log(`Ready to serve you at ${JSON.stringify(address)} master!`);
      }
    });
  }
});


