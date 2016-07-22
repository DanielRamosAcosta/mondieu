export default class WebSck {
  constructor (addr, port = 9090) {
    this.socket = new window.WebSocket(`ws://${addr}:${port}`)
    this.events = {}

    this.socket.onmessage = this.chop.bind(this)

    this.promise = null
  }

  on (method, func) {
    this.events[method] = func
  }

  send (method, params) {
    let data = {
      jsonrpc: '2.0',
      id: 1,
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
    return new Promise((resolve, reject) => {
      this.promise = { resolve, reject }
      // After 3 secs without reponse, reject the promise
      setTimeout(() => {
        this.promise.reject()
      }, 3000)
    })
  }

  chop ({ data }) {
    let {method, params, result} = JSON.parse(data)
    if (result) {
      this.promise.resolve(result)
      return
    }
    // En caso de que no sea una respuesta, sino una notificación, usar el metodo adecuado
    if (this.events[method]) {
      this.events[method](params)
    }
  }
}
