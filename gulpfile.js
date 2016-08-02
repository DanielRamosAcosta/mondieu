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

// Activar estadísticas de las tareas
require('gulp-stats')(gulp)

global.tasksConfig = {
  debug: false,
  addonName: 'webinterface.mondieu',
  destDir: 'dist'
}

gulp.task('build', ['clean'], (cb) => {
  global.tasksConfig.debug = false
  return gulp.src('app/scripts/client.jsx')
    .pipe(webpackStream(webpackConfig()))
    .pipe(gulp.dest(global.tasksConfig.destDir))
})

// Zip tasks

gulp.task('release', (cb) => {
  global.tasksConfig.destDir = `${global.tasksConfig.addonName}/${global.tasksConfig.addonName}`
  runSequence(['build', 'copyfiles'], 'compress', 'cleanBuild', cb)
})

gulp.task('copyfiles', () => {
  return gulp.src([
    './addon/*',
    './LICENSE.txt',
    './README.md'
  ])
  .pipe(gulp.dest(global.tasksConfig.destDir))
})

gulp.task('compress', (cb) => {
  mkdirp('./dist', () => {
    zipFolder(
      path.join(__dirname, global.tasksConfig.addonName),
      path.join(__dirname, `/dist/${global.tasksConfig.addonName}.zip`), (err) => {
        if (err) {
          gutil.log('[zipFolder]', err)
        } else {
          gutil.log('[zipFolder]', 'Done')
        }
        cb()
      })
  })
})

gulp.task('cleanBuild', (cb) => {
  return del([global.tasksConfig.addonName], cb)
})

// End Zip tasks

gulp.task('dev', (cb) => {
  global.tasksConfig.debug = true

  let ip = process.env.IP || '0.0.0.0'

  new WebpackDevServer(webpack(webpackConfig()), {
    historyApiFallback: true
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

let webpackConfig = () => {
  let originalConf = {
    context: path.join(__dirname, '/app'),
    debug: global.tasksConfig.debug,
    devtool: global.tasksConfig.debug ? 'inline-sourcemap' : null,
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
      path: path.join(__dirname, global.tasksConfig.destDir),
      filename: 'main.js'
    },
    plugins: global.tasksConfig.debug ? commonPlugins : commonPlugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourcemap: false,
        minimize: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
    ]),
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

  if (global.tasksConfig.debug) {
    originalConf.entry = [
      'webpack-dev-server/client?http://localhost:8080/',
      originalConf.entry
    ]

    originalConf.plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return originalConf
}
