/* eslint-disable */
require('coffee-script/register')

const config = (env = 'dev') =>
  require(`./webpack/webpack.config.${env}.litcoffee`)

module.exports = config

/* eslint-enable */
