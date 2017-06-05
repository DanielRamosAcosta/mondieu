const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/only-dev-server',
    './root.jsx'
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '../public')
  },

  context: resolve(__dirname, '../app'),
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, '../public'),
    historyApiFallback: true
  },

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
            'react-hot-loader/babel',
            'transform-decorators-legacy',
            ['transform-runtime', {polyfill: false, regenerator: true}],
          ]
        }
      },

      {
        test: /\.js[x]?$/,
        include: /react-icons/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['es2015', {modules: false}],
            'stage-0',
            'react'
          ]
        }
      },

      {
        test: /\.cs[x]?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['es2015', {modules: false}],
                'stage-0',
                'react'
              ]
            }
          }, {
            loader: 'coffee-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },

      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'css-loader',
            options: {
              localIdentName: '[hash:base64]-[name]-[local]',
              modules: true,
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [resolve(__dirname, '../app/styles')]
            }
          }
        ]
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

  resolve: {
    extensions: ['.js', '.jsx', '.sass'],
    alias: {
      components: resolve(__dirname, '../app/components'),
      containers: resolve(__dirname, '../app/containers'),
      modules: resolve(__dirname, '../app/modules'),
      utils: resolve(__dirname, '../app/utils')
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    })
  ]
}
