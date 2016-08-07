// TODO: Mover a una librería específica para el kodi

export default class WebSocket {
  constructor (addr, port = 9090) {
    this.socket = new window.WebSocket(`ws://${addr}:${port}`)
    this.events = {}

    this.socket.onmessage = this.chop.bind(this)
    this.id = 1
    this.sendQueue = []

    this.promise = {}
  }

  on (method, func) {
    this.events[method] = func
  }

  send (method, params) {
    let data = {
      jsonrpc: '2.0',
      id: Math.floor(Math.random() * 1000000),
      method: method,
      params: params || {}
    }

    if (this.socket.readyState !== this.socket.OPEN) {
      this.sendQueue.push(data)
      this.socket.onopen = () => {
        this.sendQueue.forEach(data => {
          this.socket.send(JSON.stringify(data))
        })
      }
    } else {
      this.socket.send(JSON.stringify(data))
    }
    return data.id
  }

  sendAnd (method, params, attempt, resolve, reject) {
    // 3 attempts to get reponse, recurstive function

    if (!attempt) {
      attempt = 1
      return new Promise((resolve, reject) => {
        this.sendAnd(method, params, attempt, resolve, reject)
      })
    }

    if (attempt >= 4) {
      return reject('Reponse time out ' + method)
    }

    attempt++

    let id = this.send(method, params)
    this.promise[id] = { resolve, reject }
    setTimeout(() => {
      if (this.promise[id]) {
        delete this.promise[id]
        this.sendAnd(method, params, attempt, resolve, reject)
      }
    }, 300) // 100
  }

  chop ({ data }) {
    data = JSON.parse(data)
    let { id } = data
    if (this.promise[id]) {
      this.promise[id].resolve(data)
      delete this.promise[id]
      return
    }
    let { method, params } = data
    if (this.events[method]) {
      this.events[method](params)
    }
  }
}
