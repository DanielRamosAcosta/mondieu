import dispatcher from '../dispatcher'

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
