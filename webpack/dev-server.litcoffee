# Configuración del servidor de desarrollo

## Requerimos los paquetes necesarios

    { join }             = require 'path'
    express              = require 'express'
    webpack              = require 'webpack'
    webpackDevMiddleware = require 'webpack-dev-middleware'
    webpackHotMiddleware = require 'webpack-hot-middleware'
    proxy                = require 'express-http-proxy'


## Importamos la configuración

Importamos la configuración de webpack, e instanciamos el compilador y la aplicación express.

    config   = require './webpack.config.dev'
    app      = express()
    compiler = webpack(config)

    host = process.env.HOST or '0.0.0.0'
    port = process.env.PORT or 8080

También configuramos el middleware de Webpack

    middleware = webpackDevMiddleware compiler,
      noInfo: true
      publicPath: config.output.publicPath
      stats:
        colors: true

## Establecer enrutamientos y middlewares

Primero ponemos un proxy para derivar las peticiones de imágenes al Kodi

    app.use '/image/*', proxy 'localhost:8085/image',
      proxyReqPathResolver: (req) -> req.originalUrl

Aplicamos el middleware de webpack y del cambio en caliente

    app.use middleware
    app.use webpackHotMiddleware compiler

Establecemos el enrutamiento, de modo que cuando recibamos una petición se envíe el `index.html`

    app.get '/', (req, res) ->
      res.writeHead 200, 'Content-Type': 'text/html'
      res.write middleware.fileSystem.readFileSync join(config.output.path, 'index.html')
      res.end()

En caso de que recibamos una petición distinta, envíamos un 404, ya que Kodi no soporta un API Fallback. La página 404 que se ha establecido es la misma que envía Kodi, para que la similitud sea la mayor posible.

    app.use (req, res) ->
      res.sendFile join(__dirname, './404.html')

Por último, encendemos el servidor en el puerto dado por la configuración.

    app.listen port, host, (err) ->
      if err
        console.error(err)
      else
        console.log("🚧  App is listening at http://#{host}:#{port}")
