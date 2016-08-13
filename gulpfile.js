const gulp             = require('gulp') // eslint-disable-line
const del              = require('del') // eslint-disable-line
const path             = require('path') // eslint-disable-line
const standard         = require('gulp-standard') // eslint-disable-line
const mkdirp           = require('mkdirp') // eslint-disable-line
const gutil            = require('gulp-util') // eslint-disable-line
const zipFolder        = require('zip-folder') // eslint-disable-line
const runSequence      = require('run-sequence') // eslint-disable-line
const webpack          = require('webpack') // eslint-disable-line
const webpackStream    = require('webpack-stream') // eslint-disable-line
const WebpackDevServer = require('webpack-dev-server') // eslint-disable-line
const manifest         = require('./package.json')

// TODO: Activar estadísticas de las tareas
// require('gulp-stats')(gulp)

gulp.task('build', ['clean'], (cb) => {
  let webpackConfig = require('./webpack.config.js')

  return gulp.src('app/scripts/client.jsx')
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(webpackConfig.output.path))
})

// Zip tasks

gulp.task('release', (cb) => {
  global.debug = false
  runSequence(['build', 'copyfiles'], cb)
})

gulp.task('copyfiles', () => {
  let webpackConfig = require('./webpack.config.js')
  return gulp.src([
    './addon/*',
    './LICENSE.txt',
    './README.md'
  ])
  .pipe(gulp.dest(webpackConfig.output.path))
})

gulp.task('cleanBuild', (cb) => {
  return del([manifest.addon.name], cb)
})

// End Zip tasks

gulp.task('dev', (cb) => {
  let webpackConfig = require('./webpack.config.js')
  let ip = process.env.IP || '0.0.0.0'

  new WebpackDevServer(webpack(webpackConfig), {
    historyApiFallback: true
  }).listen(8080, ip, (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    // Server listening
    gutil.log('[webpack-dev-server]', `http://${ip}:8080`)
  })
})

gulp.task('clean', () => {
  return del(['dist', 'webinterface.mondieu'])
})

gulp.task('lint', function () {
  return gulp.src([
    './app/**/*.js',
    './app/**/*.jsx'
  ])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false
    }))
})
