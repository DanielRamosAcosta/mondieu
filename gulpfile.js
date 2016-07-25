const gulp = require('gulp')
const del = require('del')
const path = require('path')
const standard = require('gulp-standard')
const mkdirp = require('mkdirp')
const gutil = require('gulp-util')
const zipFolder = require('zip-folder')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

// Activar estadísticas de las tareas
require('gulp-stats')(gulp)

const debug = process.env.NODE_ENV !== 'production'

const addonName = 'webinterface.mondieu'

gulp.task('zip', ['build', 'copyfiles', 'compress', 'cleanBuild'])

gulp.task('build', ['clean'], (cb) => {
  return gulp.src('app/scripts/client.jsx')
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(`${addonName}/${addonName}`))
})

gulp.task('copyfiles', ['build'], () => {
  return gulp.src([
    './addon/*',
    './LICENSE.txt',
    './README.md'
  ])
  .pipe(gulp.dest(`${addonName}/${addonName}`))
})

gulp.task('compress', ['copyfiles'], (cb) => {
  mkdirp('./dist', () => {
    zipFolder(path.join(__dirname, addonName), path.join(__dirname, `/dist/${addonName}.zip`), (err) => {
      if (err) {
        gutil.log('[zipFolder]', err)
      } else {
        gutil.log('[zipFolder]', 'Done')
      }
      cb()
    })
  })
})

gulp.task('cleanBuild', ['compress'], (cb) => {
  return del([addonName], cb)
})

gulp.task('serve', ['clean'], (cb) => {
  let ip = process.env.IP || '0.0.0.0'

  new WebpackDevServer(webpack(webpackConfig), {
    hot: true,
    historyApiFallback: true,
    inline: true
  }).listen(8080, ip, (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    // Server listening
    gutil.log('[webpack-dev-server]', `http://${ip}:8080`)
  })
})

gulp.task('clean', () => {
  return del(['dist/*'])
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

// ============================================================================
// Webpack Config
// ============================================================================

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

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
  entry: './scripts/client.jsx',
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
    path: path.join(__dirname, 'dist'),
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
