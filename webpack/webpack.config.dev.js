const { resolve } = require('path')
const webpack = require('webpack')

const common = require('./webpack.config.common.js')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/only-dev-server',
    common.entry
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '../public')
  },

  context: common.context,
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: common.babel.presets,
          plugins: common.babel.plugins.concat('react-hot-loader/babel')
        }
      },

      {
        test: /\.js[x]?$/,
        include: /react-icons/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: common.babel.presets
        }
      },

      {
        test: /\.(cjsx|coffe)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: common.babel.presets,
              plugins: common.babel.plugins.concat('react-hot-loader/babel')
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

  resolve: common.resolve,

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    common.HtmlWebpackPlugin
  ]
}
