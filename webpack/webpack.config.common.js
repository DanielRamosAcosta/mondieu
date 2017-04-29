const { resolve } = require('path')

module.exports = {
  context: resolve(__dirname, '../app'),

  resolve: {
    extensions: ['.js', '.jsx', '.sass'],
    alias: {
      components: resolve(__dirname, '../app/components'),
      containers: resolve(__dirname, '../app/containers'),
      modules: resolve(__dirname, '../app/modules'),
      utils: resolve(__dirname, '../app/utils'),
      constants: resolve(__dirname, '../app/constants')
    }
  }
}
