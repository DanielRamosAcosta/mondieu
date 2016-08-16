import {src, dest, parallel, series} from 'gulp'
import del from 'del'
import standard from 'gulp-standard'
import zip from 'gulp-zip'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import WebpackDevServer from 'webpack-dev-server'

import manifest from './package.json'
const webpackConfigPath = './webpack.config.babel.js'

export function clean () {
  return del(['dist'])
}

export function dev (done) {
  let webpackConfig = require(webpackConfigPath).default
  let ip = process.env.IP || '0.0.0.0'

  new WebpackDevServer(webpack(webpackConfig), {
    historyApiFallback: true
  }).listen(8080, ip, (err) => {
    if (err) throw err
    console.log(`http://${ip}:8080`)
  })
}

export function lint () {
  return src([
    'webpack.config.babel.js',
    'gulpfile.babel.js',
    './app/**/*.js',
    './app/**/*.jsx'
  ])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false
    }))
}

function productionMode (done) {
  global.debug = false
  done()
}

function build () {
  let webpackConfig = require(webpackConfigPath).default

  return src('app/scripts/client.jsx')
    .pipe(webpackStream(webpackConfig))
    .pipe(dest(webpackConfig.output.path))
}

function copyFiles () {
  let webpackConfig = require(webpackConfigPath).default
  return src([
    './addon/*',
    './LICENSE.txt',
    './README.md'
  ])
  .pipe(dest(webpackConfig.output.path))
}

function moveFiles () {
  return src('./dist/*')
    .pipe(dest(`./dist/${manifest.addon.name}`))
}

function zipFiles () {
  return src(`./dist/${manifest.addon.name}/**/*`, {base: './dist'})
    .pipe(zip(`${manifest.addon.name}.zip`, {compress: false}))
    .pipe(dest('dist'))
}

function cleanBuild () {
  return del(['./dist/*', `!./dist/${manifest.addon.name}.zip`])
}

export const release = series(productionMode, clean, parallel(build, copyFiles), moveFiles, zipFiles, cleanBuild)

export default dev
