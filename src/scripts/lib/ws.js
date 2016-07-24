export default class WebSck {
  constructor (addr, port = 9090) {
    this.socket = new window.WebSocket(`ws://${addr}:${port}`)
    this.events = {}

    this.socket.onmessage = this.chop.bind(this)
    this.id = 1

    this.promise = null
  }

  on (method, func) {
    this.events[method] = func
  }

  send (method, params) {
    let data = {
      jsonrpc: '2.0',
      id: this.id,
      method: method,
      params: params || {}
    }
    if (this.socket.readyState !== this.socket.OPEN) {
      this.socket.onopen = (event) => {
        this.socket.send(JSON.stringify(data))
      }
    } else {
      this.socket.send(JSON.stringify(data))
    }
    this.id++
  }

  sendAnd (method, params) {
    return new Promise((res, rej) => {
      this.promise = { res, rej }
      this.send(method, params)
    })
  }

  chop ({ data }) {
    data = JSON.parse(data)
    console.log(data)
    if (this.promise) {
      this.promise.res(data)
      this.promise = null
      return
    }
    let { method, params, result } = data
    // TODO: Borrar estos console.log
    console.log(method)
    if (this.events[method]) {
      this.events[method](params)
    }
  }
}
