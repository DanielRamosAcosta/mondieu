import { EventEmitter } from 'events'

import WebSocket from '../lib/ws'
import * as ControlActions from '../actions/controlActions'

import dispatcher from '../dispatcher'

class ControlStore extends EventEmitter {
  constructor () {
    super()

    this.ws = new WebSocket('localhost')

    this.ws.on('Player.OnPlay', ControlActions.kodi.putPlay)
    this.ws.on('Player.OnPause', ControlActions.kodi.putPause)
    this.ws.on('Player.OnStop', ControlActions.kodi.putStop)
    this.ws.on('Player.OnSeek', ControlActions.kodi.changeTime)
    this.ws.on('Playlist.OnAdd', ControlActions.kodi.addToPlaylist)

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
              this.pause()
            } else {
              this.play()
            }
            this.emit('playerChanged')
          })
        })
      } else {
        this.stop()
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

  pause () {
    this.playing = false
    this.paused = true
    this.stopped = false
  }

  play () {
    this.playing = true
    this.paused = false
    this.stopped = false
  }

  stop () {
    this.playing = false
    this.paused = false
    this.stopped = true
  }

  handleActions (action) {
    switch (action.type) {
      case 'KODI_PLAYER_PAUSE': {
        this.pause()
        this.emit('playerChanged')
        break
      }
      case 'KODI_PLAYER_PLAY': {
        this.play()
        this.emit('playerChanged')
        break
      }
      case 'KODI_PLAYER_STOP': {
        this.stop()
        this.emit('playerChanged')
        break
      }
      case 'KODI_PLAYER_CHANGETIME': {
        console.log(action.params)
        this.emit('playerTimeChanged')
        break
      }
      case 'KODI_PLAYER_ADDTOPLAYLIST': {
        console.log(action.params)
        this.emit('playerNewItem')
        break
      }
      case 'PLAYER_PAUSE': {
        this.ws.send('Input.ExecuteAction', {action: 'pause'})
        break
      }
      case 'PLAYER_PLAY': {
        this.ws.send('Input.ExecuteAction', {action: 'play'})
        break
      }
      case 'PLAYER_STOP': {
        this.ws.send('Input.ExecuteAction', {action: 'stop'})
        break
      }
      case 'PLAYER_CHANGETIME': {
        // this.ws.send(...)
        // Send to kodi to change the time
        break
      }
      case 'PLAYER_ADDTOPLAYLIST': {
        // this.ws.send(...)
        // Send to kodi to change the time
        break
      }
    }
  }
}

const controlStore = new ControlStore()
dispatcher.register(controlStore.handleActions.bind(controlStore))

export default controlStore
