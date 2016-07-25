const gulp = require('gulp')
const spawn = require('child_process').spawn
const del = require('del')
// const zip = require('gulp-zip')
const path = require('path')
const standard = require('gulp-standard')
var mkdirp = require('mkdirp')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

var debug = process.env.NODE_ENV !== 'production'

// Requerirlo para que salte el error si no se hizo npm install
const webpack = require('webpack-stream')

require('webpack-dev-server')
require('gulp-stats')(gulp)

gulp.task('zip', ['build', 'copyfiles', 'compress', 'cleanBuild'])

gulp.task('build', ['clean'], (cb) => {
  return gulp.src('app/scripts/client.jsx')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/'))
})

gulp.task('copyfiles', ['build'], () => {
  return gulp.src([
    './addon/*',
    './LICENSE.txt',
    './README.md'
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


// ============================================================================
// Webpack Config
// ============================================================================

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './app')
].join('!')

let commonPlugins = [
  new ExtractTextPlugin('main.css'),
  new HtmlWebpackPlugin({template: 'index.html'})
]

const webpackConfig = {
  context: path.join(__dirname, '/app'),
  devtool: debug ? 'inline-sourcemap' : null,
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders)
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      }
    ]
  },
  output: {
    filename: 'main.js'
  },
  plugins: debug ? [].concat(commonPlugins) : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ].concat(commonPlugins),
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.sass'],
    root: [path.join(__dirname, './app')]
  }
}
