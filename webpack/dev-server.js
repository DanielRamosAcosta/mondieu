/* eslint-disable import/no-extraneous-dependencies */

const { join } = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.dev')

const app = express()
const compiler = webpack(config)

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
})

app.use(middleware)

app.use(webpackHotMiddleware(compiler))

app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(middleware.fileSystem.readFileSync(join(config.output.path, 'index.html')))
  res.end()
})

app.use((req, res) => {
  res.sendFile(join(__dirname, './404.html'))
})

app.listen(port, host, err =>
  err
  ? console.error(err)
  : console.log(`🚧  App is listening at http://${host}:${port}`)
)
