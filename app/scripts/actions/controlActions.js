import dispatcher from '../dispatcher'

export let kodi = {
  putPause: (params) => {
    dispatcher.dispatch({
      type: 'KODI_PLAYER_PAUSE',
      params: params
    })
  },
  putPlay: (params) => {
    dispatcher.dispatch({
      type: 'KODI_PLAYER_PLAY',
      params: params
    })
  },
  putStop: (params) => {
    dispatcher.dispatch({
      type: 'KODI_PLAYER_STOP',
      params: params
    })
  },
  changeTime: (params) => {
    dispatcher.dispatch({
      type: 'KODI_PLAYER_CHANGETIME',
      params: params
    })
  },
  addToPlaylist: (params) => {
    dispatcher.dispatch({
      type: 'KODI_PLAYER_ADDTOPLAYLIST',
      params: params
    })
  }
}

export function putPause (params) {
  dispatcher.dispatch({
    type: 'PLAYER_PAUSE',
    params: params
  })
}

export function putPlay (params) {
  dispatcher.dispatch({
    type: 'PLAYER_PLAY',
    params: params
  })
}

export function putStop (params) {
  dispatcher.dispatch({
    type: 'PLAYER_STOP',
    params: params
  })
}

export function changeTime (params) {
  dispatcher.dispatch({
    type: 'PLAYER_CHANGETIME',
    params: params
  })
}

export function addToPlaylist (params) {
  dispatcher.dispatch({
    type: 'PLAYER_ADDTOPLAYLIST',
    params: params
  })
}
