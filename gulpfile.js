const gulp = require('gulp')
const spawn = require('child_process').spawn
const del = require('del')
const zip = require('gulp-zip')
const runSequence = require('run-sequence')

// Requerirlo para que salte el error si no se hizo npm install
require('webpack')
require('webpack-dev-server')

gulp.task('zip', (cb) => {
  runSequence('build', 'copyfiles', 'compress', 'remove')
})

gulp.task('build', ['clean'], (cb) => {
  spawn('node', [
    './node_modules/.bin/webpack',
    '-c'
  ], {stdio: 'inherit'})
  .on('exit', cb)
})

gulp.task('copyfiles', () => {
  return gulp.src('./addon/*')
  .pipe(gulp.dest('./dist'))
})

gulp.task('compress', () => {
  return gulp.src('dist/*')
  .pipe(zip('archive.zip'))
  .pipe(gulp.dest('dist'))
})

gulp.task('remove', (cb) => {
  return del(['dist/**/*', '!dist/*.zip'], cb)
})

gulp.task('serve', ['clean'], (cb) => {
  let ip = '0.0.0.0'

  if (process.env.IP) {
    ip = process.env.IP
  }

  spawn('node', [
    './node_modules/.bin/webpack-dev-server',
    '--content-base', 'src',
    '--host', ip,
    '--hot',
    '--inline',
    '--history-api-fallback'
  ], {stdio: 'inherit'})
  .on('exit', cb)
})

gulp.task('clean', () => {
  return del(['dist/**/*'])
})
