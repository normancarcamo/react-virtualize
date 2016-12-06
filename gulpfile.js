const gulp = require('gulp');
const argv   = require('yargs').argv;
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var spawn = require('child_process').spawn;

function compile(command, show_stdout, msg, cb) {
  exec(command, {encoding: 'utf8'}, (error, stdout, stderr) => {
    if (error) {
      throw error;
      return;
    } else {
      if (show_stdout) console.log(stdout);
      process.stdout.write(`${msg}`);
      if (cb) cb();
      return;
    }
  });
}

function getInfo() {
  return {
    platform: execSync('uname -a', {encoding: 'utf8'}),
    pid: process.pid,
    memoryUsage: process.memoryUsage(),
    programmingLanguage: 'JavaScript (Node)',
    nodeVersion: execSync('node -v', {encoding: 'utf8'}),
    npmVersion: execSync('npm -v', {encoding: 'utf8'}),
    nodePath: process.execPath,
    cwd: process.cwd()
  };
}

gulp.task('production', () => {
  compile('npm run webpack-compile', false, 'Please wait, transpiling files ...1% ...5%', () => {
    compile('npm run babel-compile', false, ' ...90%', () => {
      process.stdout.write(` ...100%\n`);
      console.log('\n',getInfo(),'\n');
      compile('./node_modules/.bin/nodemon dist/server.js');
      process.stdout.write(`\nOpen http://localhost:3000\n`);
    });
  });
});
