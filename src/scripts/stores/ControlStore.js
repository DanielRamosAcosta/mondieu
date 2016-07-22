import { EventEmitter } from 'events'

import WebSocket from '../lib/ws'
import * as MovieActions from '../actions/movieActions'

import dispatcher from '../dispatcher'

class MovieStore extends EventEmitter {
  constructor () {
    super()

    this.ws = new WebSocket('localhost')
    this.play = false

    this.ws.on('Player.OnPlay', MovieActions.putPlay)
    this.ws.on('Player.OnPause', MovieActions.putPause)
  }

  isPlay () {
    return this.play
  }

  isPause () {
    return !this.play
  }

  putPlay () {
    this.play = true
  }

  putPause () {
    this.play = false
  }

  handleActions (action) {
    switch (action.type) {
      case 'PLAYER_PAUSED': {
        this.play = false
        if (!action.params) {
          this.ws.send('Input.ExecuteAction', {action: 'pause'}).then(() => {
            console.log('Enviado al kodi pause')
          })
        }
        this.emit('change')
        break
      }
      case 'PLAYER_PLAY': {
        this.play = true
        if (!action.params) {
          this.ws.send('Input.ExecuteAction', {action: 'play'}).then(() => {
            console.log('Enviado al kodi play')
          })
        }
        this.emit('change')
        break
      }
    }
  }
}

const movieStore = new MovieStore()
dispatcher.register(movieStore.handleActions.bind(movieStore))

export default movieStore
