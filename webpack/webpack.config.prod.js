const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const Visualizer = require('webpack-visualizer-plugin')

const common = require('./webpack.config.common.js')

const extractSass = new ExtractTextPlugin({filename: 'main-[contenthash].css'})

module.exports = {
  entry: [
    './root.jsx'
  ],

  output: {
    filename: '[name]-[chunkhash].js',
    publicPath: '/',
    path: resolve(__dirname, '../public')
  },

  context: common.context,

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['es2015', {modules: false}],
            'stage-0',
            'react'
          ],
          plugins: [
            'transform-decorators-legacy',
            ['transform-runtime', {polyfill: false, regenerator: true}]
          ]
        }
      },

      {
        test: /\.s[ac]ss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
            options: {
              localIdentName: '[hash:base64]-[name]-[local]',
              modules: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: [resolve(__dirname, '../app/styles')]
            }
          }],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  resolve: common.resolve,

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.context && module.context.includes('node_modules')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    extractSass,
    //new Visualizer()
  ]
}
