const gulp = require('gulp')
const spawn = require('child_process').spawn
const del = require('del')
const zip = require('gulp-zip')
const standard = require('gulp-standard')

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
  return gulp.src('./addon/*')
  .pipe(gulp.dest('./dist'))
})

gulp.task('compress', ['copyfiles'], () => {
  return gulp.src('dist/*')
  .pipe(zip('webinterface.mondieu.zip'))
  .pipe(gulp.dest('dist'))
})

gulp.task('cleanBuild', ['compress'], (cb) => {
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

gulp.task('lint', function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false
    }))
})
