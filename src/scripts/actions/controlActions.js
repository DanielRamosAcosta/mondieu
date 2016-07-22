import dispatcher from '../dispatcher'

export function putPause () {
  dispatcher.dispatch({
    type: 'PLAYER_PAUSED'
  })
}

export function putPlay () {
  dispatcher.dispatch({
    type: 'PLAYER_PLAY'
  })
}
