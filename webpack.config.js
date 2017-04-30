/* eslint-disable */

const config = (env = 'dev') =>
  require(`./webpack/webpack.config.${env}.js`)

module.exports = config

/* eslint-enable */
