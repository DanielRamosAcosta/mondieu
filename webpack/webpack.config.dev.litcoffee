# Configuración de desarrollo

Requerimos los paquetes necesarios

    { resolve } = require('path')
    webpack = require('webpack')
    common = require('./webpack.config.common.js')

Y cremos la configuración

    module.exports =

Establecemos los puntos de entrada del bundle, que además de la aplicación contiene el servidor de desarrollo.

      entry: [
        'react-hot-loader/patch'
        'webpack-hot-middleware/client?reload=true'
        'webpack/hot/only-dev-server'
        common.entry
      ]

La salida y el contexto de la aplicación los traemos del fichero común.

      output: common.output
      context: common.context

Como herramienta de desarrollo `eval-source-map` que nos permite tener acceso al código fuente y los tiempos de recompilación son más rapidos.

      devtool: 'eval-source-map'

En esta sección se configuran los loaders para los distintos ficheros

      module: rules: [

El primero es para cargar ficheros JavaScript y JSX. Añadimos los presets y plugins comunes y además añadimos el `react-hot-loader` para tener la carga en caliente.

        {
          test: common.regex.javascript
          exclude: /node_modules/
          loader: 'babel-loader'
          options:
            babelrc: false
            presets: common.babel.presets
            plugins: common.babel.plugins.concat 'react-hot-loader/babel'
        }

El paquete `react-icons`... TODO

        {
          test: common.regex.javascript
          include: /react-icons/
          loader: 'babel-loader'
          options:
            babelrc: false
            presets: common.babel.presets
        }
        {
          test: common.regex.coffeescript
          use: [
            {
              loader: 'babel-loader'
              options:
                babelrc: false
                presets: common.babel.presets
                plugins: common.babel.plugins.concat 'react-hot-loader/babel'
            }
            {
              loader: 'coffee-loader'
              options: sourceMap: true
            }
          ]
        }
        {
          test: common.regex.sass
          use: [
            {
              loader: 'style-loader'
              options: sourceMap: true
            }
            {
              loader: 'css-loader'
              options:
                localIdentName: '[hash:base64]-[name]-[local]'
                modules: true
                sourceMap: true
            }
            {
              loader: 'sass-loader'
              options:
                sourceMap: true
                includePaths: [ resolve(__dirname, '../app/styles') ]
            }
          ]
        }
        {
          test: common.regex.css
          use: [
            {
              loader: 'style-loader'
              options: sourceMap: true
            }
            {
              loader: 'css-loader'
              options: sourceMap: true
            }
          ]
        }
      ]
      resolve: common.resolve
      plugins: [
        new webpack.HotModuleReplacementPlugin
        new webpack.NamedModulesPlugin
        common.HtmlWebpackPlugin
      ]
