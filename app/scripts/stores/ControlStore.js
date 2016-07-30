import { EventEmitter } from 'events'
import moment from 'moment'

import * as ControlActions from '../actions/controlActions'
import Kodi from '../lib/kodi/kodi'

import dispatcher from '../dispatcher'

class ControlStore extends EventEmitter {
  constructor () {
    super()

    this.kodi = new Kodi('localhost')
    console.log(this.kodi)

    this.state = {}

    this.kodi.Player.OnPlay(ControlActions.kodi.Player.OnPlay)
    this.kodi.Player.OnPause(ControlActions.kodi.Player.OnPause)
    this.kodi.Player.OnStop(ControlActions.kodi.Player.OnStop)
    this.kodi.Player.OnSeek(ControlActions.kodi.Player.OnSeek)
    // this.ws.on('Playlist.OnAdd', ControlActions.kodi.Playlist.OnAdd)

    this.kodi.Player.GetActivePlayers().then((players) => {
      if (players.length >= 1) {
        let { playerid } = players[0]
        this.kodi.Player.GetProperties(playerid, 'time').then(time => this.OnNewCurrentTime(time))
        this.kodi.Player.GetProperties(playerid, 'totaltime').then(totaltime => this.OnNewTotalTime(totaltime))
        this.kodi.Player.GetProperties(playerid, 'speed').then((speed) => {
          if (speed) {
            console.log('Estamos en play')
            this.OnPlay()
          } else {
            console.log('Estamos en pause')
            this.OnPause()
          }
        })
      } else {
        console.log('Estamos en stop')
        this.OnStop()
      }
    })
  }

  OnPause () {
    this.state.play = false
    this.state.pause = true
    this.state.stop = false
    this.virtualSeek(false)
    this.emit('OnPause')
  }

  OnPlay () {
    this.state.play = true
    this.state.pause = false
    this.state.stop = false
    this.virtualSeek(true)
    this.emit('OnPlay')
  }

  OnStop () {
    this.state.play = false
    this.state.pause = false
    this.state.stop = true
    this.virtualSeek(false)
    this.emit('OnStop')
  }

  OnNewCurrentTime (time) {
    this.state.currentTime = time
    this.emit('OnNewCurrentTime')
  }

  OnNewTotalTime (time) {
    this.state.totalTime = time
    // this.emit('OnNewTotalTime') Quitado hasta que tenga alguna utilidad
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

  getCurrentTime (playerid) {
    return new Promise((resolve, reject) => {
      this.ws.sendAnd('Player.GetProperties', {
        properties: [ 'time' ],
        playerid: playerid
      }).then(({ time }) => {
        if (time) {
          resolve(moment.duration(time))
        } else {
          resolve(null)
        }
      })
    })
  }

  getTotalTime (playerid) {
    return new Promise((resolve, reject) => {
      this.ws.sendAnd('Player.GetProperties', {
        properties: [ 'totaltime' ],
        playerid: playerid
      }).then(({ totaltime }) => {
        if (totaltime) {
          resolve(moment.duration(totaltime))
        } else {
          resolve(null)
        }
      })
    })
  }

  virtualSeek (turnOn) {
    if (turnOn) {
      this.intervalVirtualSeek = setInterval(() => {
        this.getPlayerId().then((playerid) => {
          if (playerid !== null) {
            this.getCurrentTime(playerid).then((time) => {
              ControlActions.kodi.Player.OnSeek({
                data: {
                  player: {
                    time: {
                      hours: time.hours(),
                      milliseconds: time.milliseconds(),
                      minutes: time.minutes(),
                      seconds: time.seconds()
                    }
                  }
                },
                sender: 'xbmc'
              })
            })
          }
        })
      }, 500)
    } else {
      clearInterval(this.intervalVirtualSeek)
    }
  }

  handleActions (action) {
    switch (action.type) {
      case 'KODI_PLAYER_ON_PAUSE': {
        this.OnPause()
        break
      }
      case 'KODI_PLAYER_ON_PLAY': {
        let { playerid } = action.params.data.player
        console.log(action.params)
        console.log(playerid)
        this.getTotalTime(playerid).then((totalTime) => {
          this.OnNewTotalTime(totalTime)
          this.OnPlay()
        })
        break
      }
      case 'KODI_PLAYER_ON_STOP': {
        this.OnStop()
        break
      }
      case 'KODI_PLAYER_ON_SEEK': {
        this.OnNewCurrentTime(moment.duration(action.params.data.player.time))
        break
      }
      case 'KODI_PLAYLIST_ONADD': {
        // Update totalTime
        /*

        A veces esto no se llama, mejor usar OnPlay
        let { id, type } = action.params.data.item
        if (action.params.data.position === 0) {
          this.getTotalTime({ id, type }).then((totalTime) => {
            this.OnNewTotalTime(totalTime)
          })
        }

        */
        break
      }
      case 'PLAYER_ON_PAUSE': {
        this.ws.send('Input.ExecuteAction', {action: 'pause'})
        break
      }
      case 'PLAYER_ON_PLAY': {
        this.ws.send('Input.ExecuteAction', {action: 'play'})
        break
      }
      case 'PLAYER_ON_STOP': {
        this.ws.send('Input.ExecuteAction', {action: 'stop'})
        break
      }
      case 'PLAYER_ON_SEEK': {
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
