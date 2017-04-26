const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')

const extractSass = new ExtractTextPlugin({
  filename: 'main-[contenthash].css'
})

const extractFlexboxGrid = new ExtractTextPlugin({
  filename: 'grid-[contenthash].css'
})

const extractRobotoFont = new ExtractTextPlugin({
  filename: 'roboto-[contenthash].css'
})

module.exports = {
  entry: [
    './root.jsx'
  ],

  output: {
    filename: '[name]-[chunkhash].js',
    publicPath: '/',
    path: resolve(__dirname, '../public')
  },

  context: resolve(__dirname, '../app'),

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
            'transform-decorators-legacy'
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
        include: /typeface-roboto/,
        use: extractRobotoFont.extract({
          use: [{
            loader: 'css-loader'
          }],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.sass'],
    alias: {
      components: resolve(__dirname, '../app/components'),
      containers: resolve(__dirname, '../app/containers'),
      modules: resolve(__dirname, '../app/modules'),
      utils: resolve(__dirname, '../app/utils'),
      constants: resolve(__dirname, '../app/constants')
    }
  },

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
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.API_ENDPOINT': JSON.stringify('/TODOOOOOOO')
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
    extractFlexboxGrid,
    new Visualizer()
  ]
}
