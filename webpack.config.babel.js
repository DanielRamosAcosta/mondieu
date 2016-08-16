import webpack from 'webpack'
import path from 'path'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import manifest from './package.json'

if (global.server == null) {
  global.server = process.argv.toString().match(/webpack-dev-server/g) !== null
}

if (global.server) { // If server mode, debug mode activated
  global.debug = true
}

if (global.debug == null) {
  global.debug = process.env.NODE_ENV !== 'production'
}

// Default production configuration

let config = {
  context: path.join(__dirname, '/app'),
  entry: './scripts/client.jsx',
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'babel-polyfill', 'transform-class-properties', 'transform-decorators-legacy', ['babel-project-relative-import', {
            'sourceDir': 'app/'
          }]]
        }
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', [
          'css-loader',
          'postcss-loader',
          'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './app')
        ].join('!'))
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
    // path: path.join(__dirname, `${manifest.addon.name}/${manifest.addon.name}`),
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  plugins: [
    new ExtractTextPlugin('main.css'),
    new HtmlWebpackPlugin({template: 'index.html'}),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
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

// Debug mode modifications
if (global.debug) {
  config.debug = true
  config.devtool = 'inline-sourcemap'
  config.output.path = path.join(__dirname, 'dist')
}

// Production mode modifications

if (!global.debug) {
  config.plugins.concat([
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
  ])
}

// Server mode modifications

if (global.server) {
  config.entry = [
    'webpack-dev-server/client?http://localhost:8080/',
    config.entry
  ]
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

export default config
