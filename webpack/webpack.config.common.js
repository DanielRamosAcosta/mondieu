const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: resolve(__dirname, '../app'),

  entry: './root.jsx',

  output: {
    filename: '[name]-[chunkhash].js',
    publicPath: '/',
    path: resolve(__dirname, '../public')
  },

  resolve: {
    extensions: ['.js', '.jsx', '.cjsx', '.coffee', '.sass'],
    alias: {
      components: resolve(__dirname, '../app/components'),
      containers: resolve(__dirname, '../app/containers'),
      modules: resolve(__dirname, '../app/modules'),
      utils: resolve(__dirname, '../app/utils')
    }
  },

  babel: {
    presets: [
      ['es2015', {modules: false}],
      'stage-0',
      'react'
    ],
    plugins: [
      'transform-decorators-legacy',
      ['transform-runtime', {polyfill: false, regenerator: true}],
    ]
  },

  HtmlWebpackPlugin: new HtmlWebpackPlugin({
    template: 'index.tpl.html',
    inject: 'body',
    filename: 'index.html'
  }),

  regex: {
    javascript: /\.js[x]?$/,
    coffeescript: /\.(cjsx|coffe)?$/,
    sass: /\.s[ac]ss$/,
    css: /\.css$/
  }
}
