import Kodi from '~/scripts/lib/kodi'
import Kodi2 from 'kodi-ws'

// import { ExecuteAction, Seek, FetchTimebar } from '~/scripts/actions/playControlActions'

const kodiMiddleware = (() => {
  let connection
  /*
  let kodi = new Kodi('localhost')
  let firstTime = true
  let intervalVirtualSeek = null

  const OnPlay = store => evt => {
    store.dispatch(FetchTimebar())
    store.dispatch(ExecuteAction('play', 'kodi'))
  }

  const OnPause = store => evt => {
    store.dispatch(ExecuteAction('pause', 'kodi'))
  }

  const OnStop = store => evt => {
    store.dispatch(ExecuteAction('stop', 'kodi'))
  }

  const OnSeek = store => evt => {
    store.dispatch(Seek(evt.player.time, 'kodi'))
  }

  const VirtualSeek = (store, turnOn) => {
    if (turnOn) {
      intervalVirtualSeek = setInterval(() => {
        getPlayerId().then(playerid => {
          if (playerid !== null) {
            kodi.Player.GetProperties(playerid, 'time').then(time => {
              // FIXME: Averiguar por que pega un salto pa atras
              // console.log(`${time.hours()}:${time.minutes()}:${time.seconds()}.${time.milliseconds()}`)
              store.dispatch(Seek(time, 'kodi'))
            })
          }
        })
      }, 500)
    } else {
      clearInterval(intervalVirtualSeek)
      intervalVirtualSeek = null
    }
  }

  const getPlayerId = () => {
    return new Promise((resolve, reject) => {
      kodi.Player.GetActivePlayers().then(players => {
        if (players.length >= 1) {
          resolve(players[0].playerid)
        } else {
          resolve(null)
        }
      })
    })
  }

  const bindEvents = store => {
    kodi.Player.OnPlay(OnPlay(store))
    kodi.Player.OnPause(OnPause(store))
    kodi.Player.OnStop(OnStop(store))
    kodi.Player.OnSeek(OnSeek(store))
  }*/

  return store => next => action => {/*
    console.log(action)
    if (firstTime) {
      bindEvents(store)
      firstTime = false
    }

    if (action.payload && (action.payload.origin === 'kodi')) {
      switch (action.type) {
        case 'SEEK': {
          action.payload = action.payload.time
          break
        }
        case 'EXECUTE_ACTION': {
          action.payload = action.payload.action
          switch (action.payload) {
            case 'play': {
              VirtualSeek(store, true)
              break
            }
            case 'stop': {
              VirtualSeek(store, false)
              break
            }
            case 'pause': {
              VirtualSeek(store, false)
              break
            }
          }
          break
        }
      }
      return next(action)
    }
    */
    switch (action.type) {
      case 'KODI_CONNECT': {
        action.payload = Kodi2(/* TODO: poner aqui la ip y puertos reales */).then((conn) => {
          connection = conn
          console.log(connection)
        })
        break
      }
      /*
      case 'EXECUTE_ACTION': {
        kodi.Input.ExecuteAction(action.payload.action)
        return
      }
      case 'SEEK': {
        getPlayerId().then(playerid => {
          if (playerid !== null) {
            kodi.Player.Seek(playerid, action.payload.time)
          }
        })
        return
      }
      case 'FETCH_TIMEBAR': {
        action.payload = new Promise((resolve, reject) => {
          getPlayerId().then(playerid => {
            if (playerid !== null) {
              kodi.Player.GetProperties(playerid, 'totaltime').then(totaltime => {
                kodi.Player.GetProperties(playerid, 'time').then(time => {
                  resolve({time, totaltime})
                })
              })
            }
          })
        })
        break
      }
      case 'FETCH_CONTROLS': {
        action.payload = new Promise((resolve, reject) => {
          getPlayerId().then(playerid => {
            if (playerid !== null) {
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
        break
      }*/
    }
    return next(action)
  }
})()

export default kodiMiddleware
