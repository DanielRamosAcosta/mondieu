import Kodi from '~/scripts/lib/kodi/kodi' // TODO: Cambiar kodi por index

import { ExecuteAction, Seek, GetTimebarState } from '~/scripts/actions/playControlActions'

const kodiMiddleware = (() => {
  let kodi = new Kodi('localhost')
  let firstTime = true
  let intervalVirtualSeek = false

  const OnPlay = store => evt => {
    store.dispatch(ExecuteAction('play', 'kodi'))
  }

  const OnPause = store => evt => {
    store.dispatch(ExecuteAction('pause', 'kodi'))
  }

  const OnStop = store => evt => {
    store.dispatch(ExecuteAction('stop', 'kodi'))
  }

  const OnSeek = store => evt => {
    console.log(evt)
    store.dispatch(Seek(evt.player.time, 'kodi'))
  }

  const VirtualSeek = (store, turnOn) => {
    console.log('Enviar accion de cambio de tiempo')
    if (turnOn) {
      intervalVirtualSeek = setInterval(() => {
        kodi.Player.GetActivePlayers().then(players => {
          if (players.length >= 1) {
            let { playerid } = players[0]
            kodi.Player.GetProperties(playerid, 'time').then(time => {
              store.dispatch(Seek(time, 'kodi'))
            })
          }
        })
      }, 500)
    } else {
      clearInterval(intervalVirtualSeek)
    }
  }

  const bindEvents = store => {
    kodi.Player.OnPlay(OnPlay(store))
    kodi.Player.OnPause(OnPause(store))
    kodi.Player.OnStop(OnStop(store))
    kodi.Player.OnSeek(OnSeek(store))
  }

  return store => next => action => {
    if (action.payload && (action.payload.origin === 'kodi')) {
      // TODO: change to a switch
      if (action.type === 'SEEK') {
        action.payload = action.payload.time
      }
      if (action.type === 'EXECUTE_ACTION') {
        action.payload = action.payload.action
        switch (action.payload) {
          case 'play': {
            console.log('Activar setInterval')
            VirtualSeek(store, true)
            store.dispatch(GetTimebarState())
            break
          }
          case 'stop': {
            console.log('Desactivar setInterval')
            VirtualSeek(store, false)
            break
          }
          case 'pause': {
            console.log('Desactivar setInterval')
            VirtualSeek(store, false)
            break
          }
        }
      }
      // console.log(action)
      // console.log(action.payload)
      return next(action)
    }

    if (firstTime) {
      bindEvents(store)
      firstTime = false
    }

    switch (action.type) {
      case 'EXECUTE_ACTION': {
        kodi.Input.ExecuteAction(action.payload.action)
        return
      }
      case 'SEEK': {
        kodi.Player.GetActivePlayers().then(players => {
          if (players.length >= 1) {
            let { playerid } = players[0]
            kodi.Player.Seek(playerid, action.payload.time)
          }
        })
        return
      }
      case 'FETCH_TIMEBAR': {
        let p1 = new Promise((resolve, reject) => {
          kodi.Player.GetActivePlayers().then(players => {
            if (players.length >= 1) {
              let { playerid } = players[0]
              kodi.Player.GetProperties(playerid, 'totaltime').then(totaltime => {
                kodi.Player.GetProperties(playerid, 'time').then(time => {
                  resolve({time, totaltime})
                })
              })
            }
          })
        })
        action.payload = p1
        return next(action)
      }
      case 'FETCH_CONTROLS': {
        let p1 = new Promise((resolve, reject) => {
          kodi.Player.GetActivePlayers().then(players => {
            if (players.length >= 1) {
              let { playerid } = players[0]
              kodi.Player.GetProperties(playerid, 'speed').then(speed => {
                if (speed) {
                  VirtualSeek(store, true)
                  resolve('play')
                } else {
                  VirtualSeek(store, false)
                  resolve('pause')
                }
              })
            } else {
              VirtualSeek(store, false)
              resolve('stop')
            }
          })
        })
        action.payload = p1
        return next(action)
      }
      default:
        return next(action)
    }
  }
})()

export default kodiMiddleware
