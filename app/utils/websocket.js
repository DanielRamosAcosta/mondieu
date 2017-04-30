import { observable } from 'mobx'
import jrpc from 'jrpc-schema'

class Kodi {
  constructor () {
    this.socket = new WebSocket('ws://localhost:9090')
    this.send = this.socket.send.bind(this.socket)
  }

  init () {
    return new Promise((resolve, reject) => {
      this.socket.onopen = () => {
        this.importSchema()
          .then(resolve)
          .catch(reject)
      }
    })
  }

  loadSchema () {
    const fetchSchema = jrpc.run('JSONRPC.Introspect', [], this.send)
    this.socket.onmessage = ({ data }) => fetchSchema.handle(data)

    return fetchSchema
  }

  async importSchema () {
    this.schema = new jrpc.Schema(await this.loadSchema(), this.send)
    this.socket.onmessage = ({ data }) => {
      console.log(data)
      this.schema.handleResponse(data)
    }
    return this
  }

  run (method, ...args) {
    return this.schema.schema.methods[method](...args)
  }

  notification (method, cb) {
    return this.schema.schema.notifications[method](cb)
  }
}

const kodi = new Kodi()

export default kodi.init()
