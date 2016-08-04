import { EventEmitter } from 'events'

import * as ControlActions from '~/scripts/actions/controlActions'
import Kodi from '~/scripts/lib/kodi/kodi'

import dispatcher from '~/scripts/dispatcher'

class ControlStore extends EventEmitter {
  constructor () {
    super()

    this.kodi = new Kodi(location.host.match(/(.*):/)[1])
    console.log(Kodi)
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
        this.kodi.Player.GetProperties(playerid, 'totaltime').then((totaltime) => {
          console.log(totaltime)
          this.OnNewTotalTime(totaltime)
          this.kodi.Player.GetProperties(playerid, 'time').then(time => this.OnNewCurrentTime(time))
        })
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

  virtualSeek (turnOn) {
    if (turnOn) {
      this.intervalVirtualSeek = setInterval(() => {
        this.kodi.Player.GetActivePlayers().then((players) => {
          if (players.length >= 1) {
            let { playerid } = players[0]
            this.kodi.Player.GetProperties(playerid, 'time').then((time) => {
              this.OnNewCurrentTime(time)
              ControlActions.kodi.Player.OnSeek({
                player: {time}
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
        this.kodi.Player.GetProperties(action.params.player.playerid, 'totaltime').then((totaltime) => {
          this.OnNewTotalTime(totaltime)
          this.OnPlay()
        })
        break
      }
      case 'KODI_PLAYER_ON_STOP': {
        this.OnStop()
        break
      }
      case 'KODI_PLAYER_ON_SEEK': {
        this.OnNewCurrentTime(action.params.player.time)
        break
      }
      case 'KODI_PLAYLIST_ONADD': {
        // TODO: Do something useful
        break
      }
      case 'PLAYER_ON_PAUSE': {
        this.kodi.Input.ExecuteAction('pause')
        break
      }
      case 'PLAYER_ON_PLAY': {
        this.kodi.Input.ExecuteAction('play')
        break
      }
      case 'PLAYER_ON_STOP': {
        this.kodi.Input.ExecuteAction('stop')
        break
      }
      case 'PLAYER_ON_SEEK': {
        this.kodi.Player.GetActivePlayers().then((players) => {
          if (players.length >= 1) {
            let { playerid } = players[0]
            this.kodi.Player.Seek(playerid, action.params)
          }
        })
        break
      }
    }
  }
}

const controlStore = new ControlStore()
dispatcher.register(controlStore.handleActions.bind(controlStore))

export default controlStore
