const {src, dest, parallel, series} = require('gulp')
const del = require('del')
const standard = require('gulp-standard')
const zip = require('gulp-zip')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const WebpackDevServer = require('webpack-dev-server')

const manifest = require('./package.json')
const webpackConfigPath = './webpack.config.babel.js'

const clean = () => del(['dist'])

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

const release = series(productionMode, clean, parallel(build, copyFiles), moveFiles, zipFiles, cleanBuild)

module.exports = {
  release
}
