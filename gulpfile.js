const gulp = require('gulp')
const spawn = require('child_process').spawn
const del = require('del')
const zip = require('gulp-zip')
const standard = require('gulp-standard')
var mkdirp = require('mkdirp')

// Requerirlo para que salte el error si no se hizo npm install
require('webpack')
require('webpack-dev-server')
require('gulp-stats')(gulp)

gulp.task('zip', ['build', 'copyfiles', 'compress', 'cleanBuild'])

gulp.task('build', ['clean'], (cb) => {
  spawn('node', [
    './node_modules/.bin/webpack',
    '-c'
  ], {stdio: 'inherit'})
  .on('exit', cb)
})

gulp.task('copyfiles', ['build'], () => {
  return gulp.src([
    './addon/*',
    './LICENSE.txt',
    './README.md',
  ])
  .pipe(gulp.dest('./webinterface.mondieu'))
})

gulp.task('compress', ['copyfiles'], (cb) => {
  mkdirp('./dist', function(err) {
    spawn('zip', [
      '-0',
      '-r',
      './dist/webinterface.mondieu.zip',
      './webinterface.mondieu/'
    ], {stdio: 'inherit'})
    .on('exit', cb)
  })
})

gulp.task('cleanBuild', ['compress'], (cb) => {
  return del(['webinterface.mondieu'], cb)
})

gulp.task('serve', ['clean'], (cb) => {
  let ip = '0.0.0.0'

  if (process.env.IP) {
    ip = process.env.IP
  }

  spawn('node', [
    './node_modules/.bin/webpack-dev-server',
    '--content-base', 'app',
    '--host', ip,
    '--hot',
    '--inline',
    '--history-api-fallback'
  ], {stdio: 'inherit'})
  .on('exit', cb)
})

gulp.task('clean', () => {
  return del(['dist/*'])
})

gulp.task('lint', function () {
  return gulp.src(['./app/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false
    }))
})
