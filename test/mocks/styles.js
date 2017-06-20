const crypto = require('crypto')

const handlers = {
  get (target, className) {
    const hash = crypto.randomBytes(21).toString('base64')
    const filename = 'styles'
    return `${hash}-${filename}-${className}`
  },

  set (target, name) {
    throw new Error('No se puede cambiar el objeto styles')
  }
}

module.exports = new Proxy({}, handlers)
