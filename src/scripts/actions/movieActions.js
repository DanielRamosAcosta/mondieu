import dispatcher from '../dispatcher'

export function putPause (params) {
  dispatcher.dispatch({
    type: 'PLAYER_PAUSED',
    params: params
  })
}

export function putPlay (params) {
  dispatcher.dispatch({
    type: 'PLAYER_PLAY',
    params: params
  })
}
