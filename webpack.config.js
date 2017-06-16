/* eslint-disable */
require('coffee-script/register')

const config = (env = 'dev') =>
  require(`./webpack/webpack.config.${env}.js`)

module.exports = config

/* eslint-enable */
