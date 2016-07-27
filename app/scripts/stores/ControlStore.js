import { EventEmitter } from 'events'
import moment from 'moment'

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

    this.currentPlayTime = new Date()
    this.maxPlayTime = new Date(0, 0, 0, 0, 5, 0, 0)

    // Figure out if player is stopped, playing something or paused
    this.getPlayerId().then((playerid) => {
      if (playerid !== null) {
        // Get player totaltime
        this.getPlayerTotaltime(playerid).then((totaltime) => {
          this.currentTotalTime = totaltime
          this.emit('maxTimeChanged')
        })

        // Get player currentime
        this.getPlayTime(playerid).then((ATime) => {
          this.getPlayTime(playerid).then((BTime) => {
            console.log(ATime.asMilliseconds())
            console.log(BTime.asMilliseconds())
            if (ATime.asMilliseconds() === BTime.asMilliseconds()) {
              console.log('Estamos en pausa')
              this.pause()
            } else {
              console.log('Estamos en play')
              this.play()
            }
            this.currentPlayTime = BTime
            this.emit('playerChanged')
          })
        })
      } else {
        console.log('Estamos en stop')
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

  getCurrentPlayTime () {
    return this.currentPlayTime
  }

  getCurrentTotalTime () {
    return this.currentTotalTime
  }

  pause () {
    this.playing = false
    this.paused = true
    this.stopped = false
    clearInterval(this.updateTimebar)
  }

  play () {
    this.playing = true
    this.paused = false
    this.stopped = false
    this.updateTimebar = setInterval(this.updateTime.bind(this), 500)
  }

  stop () {
    this.playing = false
    this.paused = false
    this.stopped = true
    clearInterval(this.updateTimebar)
  }

  getPlayerId () {
    return new Promise((resolve, reject) => {
      this.ws.sendAnd('Player.GetActivePlayers').then((players) => {
        if (players.length === 0) {
          resolve(null)
        } else {
          resolve(players[0].playerid)
        }
      })
    })
  }

  getPlayTime (playerid) {
    return new Promise((resolve, reject) => {
      this.ws.sendAnd('Player.GetProperties', {
        'properties': [ 'time' ],
        'playerid': playerid
      }).then(({ time }) => {
        if (time) {
          resolve(moment.duration(time))
        } else {
          resolve(null)
        }
      })
    })
  }

  getPlayerTotaltime (playerid) {
    return new Promise((resolve, reject) => {
      this.ws.sendAnd('Player.GetProperties', {
        'properties': [ 'totaltime' ],
        'playerid': playerid
      }).then(({ totaltime }) => {
        if (totaltime) {
          resolve(moment.duration(totaltime))
        } else {
          resolve(null)
        }
      })
    })
  }

  updateTime () {
    this.getPlayerId().then((playerid) => {
      if (playerid !== null) {
        this.getPlayTime(playerid).then((time) => {
          ControlActions.kodi.changeTime(time)
        })
      }
    })
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
        console.log('KODI_PLAYER_CHANGETIME')
        console.log(action.params)
        this.currentPlayTime = action.params
        this.emit('playerTimeChanged')
        break
      }
      case 'KODI_PLAYER_ADDTOPLAYLIST': {
        this.getPlayerId().then((playerid) => {
          if (playerid !== null) {
            // Get player totaltime
            this.getPlayerTotaltime(playerid).then((totaltime) => {
              this.currentTotalTime = totaltime
              this.emit('maxTimeChanged')
            })
          }
        })
        // this.emit('playerNewItem')
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
