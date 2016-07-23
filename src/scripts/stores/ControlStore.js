import { EventEmitter } from 'events'

import WebSocket from '../lib/ws'
import * as ControlActions from '../actions/controlActions'

import dispatcher from '../dispatcher'

class ControlStore extends EventEmitter {
  constructor () {
    super()

    this.ws = new WebSocket('localhost')
    this.play = false
    this.playing = false
    this.paused = false
    this.stopped = false

    this.ws.on('Player.OnPlay', ControlActions.putPlay)
    this.ws.on('Player.OnPause', ControlActions.putPause)
    this.ws.on('Player.OnStop', ControlActions.putStop)

    // Figure out if player is stopped, playing something or paused
    this.ws.sendAnd('Player.GetActivePlayers').then(({ result }) => {
      if (result.length !== 0) {
        this.ws.sendAnd('Player.GetProperties', {
          'properties': [ 'time' ],
          'playerid': result[0].playerid
        }).then((ATime) => {
          ATime = ATime.result.time
          this.ws.sendAnd('Player.GetProperties', {
            'properties': [ 'time' ],
            'playerid': result[0].playerid
          }).then((BTime) => {
            BTime = BTime.result.time
            if ((ATime.seconds === BTime.seconds) && (ATime.milliseconds === BTime.milliseconds)) {
              this.paused = true
            } else {
              this.playing = true
            }
            this.emit('playerChanged')
          })
        })
      } else {
        this.stopped = true
      }
    })
  }

  isPlaying () {
    return this.playing
  }

  isPaused () {
    return this.paused
  }

  isStopped () {
    return this.stopped
  }

  handleActions (action) {
    switch (action.type) {
      case 'PLAYER_PAUSE': {
        if (!action.params) {
          this.ws.send('Input.ExecuteAction', {action: 'pause'})
          return
        }
        this.playing = false
        this.paused = true
        this.stopped = false
        this.emit('playerChanged')
        break
      }
      case 'PLAYER_PLAY': {
        if (!action.params) {
          this.ws.send('Input.ExecuteAction', {action: 'play'})
          return
        }
        this.playing = true
        this.paused = false
        this.stopped = false
        this.emit('playerChanged')
        break
      }
      case 'PLAYER_STOP': {
        if (!action.params) {
          this.ws.send('Input.ExecuteAction', {action: 'stop'})
          return
        }
        this.playing = false
        this.paused = false
        this.stopped = true
        this.emit('playerChanged')
        break
      }
    }
  }
}

const controlStore = new ControlStore()
dispatcher.register(controlStore.handleActions.bind(controlStore))

export default controlStore
