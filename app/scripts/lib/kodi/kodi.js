import WebSocket from '../ws'

import Input from './input'
import Player from './player'

export default class Kodi {
  constructor (addr, port) {
    this.webSocket = new WebSocket(addr, port)

    this.Input = new Input(this.webSocket)
    this.Player = new Player(this.webSocket)
  }
}
