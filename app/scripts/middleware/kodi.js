import Kodi from '~/scripts/lib/kodi/kodi' // TODO: Cambiar kodi por index

import { ExecuteAction, Seek } from '~/scripts/actions/playControlActions'

const kodiMiddleware = (() => {
  let kodi = new Kodi('localhost')
  let firstTime = true

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

  const bindEvents = store => {
    kodi.Player.OnPlay(OnPlay(store))
    kodi.Player.OnPause(OnPause(store))
    kodi.Player.OnStop(OnStop(store))
    kodi.Player.OnSeek(OnSeek(store))
  }

  return store => next => action => {
    if (action.payload.origin === 'kodi') {
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
        kodi.Player.GetActivePlayers().then((players) => {
          if (players.length >= 1) {
            let { playerid } = players[0]
            kodi.Player.Seek(playerid, action.payload.time)
          }
        })
        return
      }
    }
    return next(action)
  }
})()

export default kodiMiddleware
