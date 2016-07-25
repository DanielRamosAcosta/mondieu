export default class WebSck {
  constructor (addr, port = 9090) {
    this.socket = new window.WebSocket(`ws://${addr}:${port}`)
    this.events = {}

    this.socket.onmessage = this.chop.bind(this)
    this.id = 1

    this.promise = {}
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
      let { id } = this
      this.promise[id] = { res, rej }
      this.send(method, params)
      setTimeout(() => {
        if (this.promise[id]) {
          this.promise[id].rej('Reponse time out')
          delete this.promise[id]
        }
      }, 1000)
    })
  }

  chop ({ data }) {
    data = JSON.parse(data)
    //console.log(data)
    let { id } = data
    if (this.promise[id]) {
      this.promise[id].res(data.result)
      delete this.promise[id]
      return
    }
    let { method, params } = data
    // TODO: Borrar estos console.log
    console.log(method)
    if (this.events[method]) {
      this.events[method](params)
    }
  }
}
