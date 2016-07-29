import { EventEmitter } from 'events'
import moment from 'moment'

import WebSocket from '../lib/ws'
import * as ControlActions from '../actions/controlActions'
import Kodi from '../lib/kodi/kodi'

import dispatcher from '../dispatcher'

class ControlStore extends EventEmitter {
  constructor () {
    super()

    // this.ws = new WebSocket('localhost')

    this.state = {}

    /*this.ws.on('Player.OnPlay', ControlActions.kodi.Player.OnPlay)
    this.ws.on('Player.OnPause', ControlActions.kodi.Player.OnPause)
    this.ws.on('Player.OnStop', ControlActions.kodi.Player.OnStop)
    this.ws.on('Player.OnSeek', ControlActions.kodi.Player.OnSeek)
    this.ws.on('Playlist.OnAdd', ControlActions.kodi.Playlist.OnAdd)

    this.currentPlayTime = new Date()
    this.maxPlayTime = new Date(0, 0, 0, 0, 5, 0, 0)

    // Figure out if player is stopped, playing something or paused
    this.getPlayerId().then((playerid) => {
      if (playerid !== null) {
        // Get player totaltime
        this.getTotalTime(playerid).then((totaltime) => {
          this.state.totalTime = totaltime
        })

        // Get player current time and check if it's paused or playing
        this.getCurrentTime(playerid).then((ATime) => {
          this.OnNewCurrentTime(ATime)

          this.getCurrentTime(playerid).then((BTime) => {
            console.log(ATime.asMilliseconds())
            console.log(BTime.asMilliseconds())
            if (ATime.asMilliseconds() === BTime.asMilliseconds()) {
              console.log('Estamos en pausa')
              this.OnPause()
            } else {
              console.log('Estamos en play')
              this.OnPlay()
            }
          })
        })
      } else {
        console.log('Estamos en stop')
        this.OnStop()
      }
    })*/

    // TODO: Quitar estas pruebas del kodi
    let kodi = new Kodi('localhost')
    console.log(kodi)
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

  OnTotalTime (time) {
    this.state.totalTime = time
    // this.emit('OnTotalTime') Quitado hasta que tenga alguna utilidad
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
          this.OnTotalTime(totalTime)
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
            this.OnTotalTime(totalTime)
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
