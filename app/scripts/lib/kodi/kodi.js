import WebSocket from '~/scripts/lib/ws'

import Input from './input'
import Player from './player'

export default class Kodi {
  constructor (addr, port) {
    this.webSocket = new WebSocket(addr, port)

    this.Input = new Input(this.webSocket)
    this.Player = new Player(this.webSocket)
  }
  disconnect () {
    if (this.webSocket !== null) {
      this.webSocket.close()
    }
    this.webSocket = null
  }
}
