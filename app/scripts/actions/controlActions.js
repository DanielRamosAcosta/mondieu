import dispatcher from '../dispatcher'

export let kodi = {
  Player: {
    OnPause: (params) => {
      dispatcher.dispatch({
        type: 'KODI_PLAYER_ON_PAUSE',
        params: params
      })
    },
    OnPlay: (params) => {
      dispatcher.dispatch({
        type: 'KODI_PLAYER_ON_PLAY',
        params: params
      })
    },
    OnStop: (params) => {
      dispatcher.dispatch({
        type: 'KODI_PLAYER_ON_STOP',
        params: params
      })
    },
    OnSeek: (params) => {
      dispatcher.dispatch({
        type: 'KODI_PLAYER_ON_SEEK',
        params: params
      })
    },
    changeTime: (params) => {
      dispatcher.dispatch({
        type: 'KODI_PLAYER_CHANGETIME',
        params: params
      })
    }
  },
  Playlist: {
    OnAdd: (params) => {
      dispatcher.dispatch({
        type: 'KODI_PLAYLIST_ONADD',
        params: params
      })
    }
  }
}

export function OnPause (params) {
  dispatcher.dispatch({
    type: 'PLAYER_ON_PAUSE',
    params: params
  })
}

export function OnPlay (params) {
  dispatcher.dispatch({
    type: 'PLAYER_ON_PLAY',
    params: params
  })
}

export function OnStop (params) {
  dispatcher.dispatch({
    type: 'PLAYER_ON_STOP',
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
