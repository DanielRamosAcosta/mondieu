import { combineEpics } from 'redux-observable'

import movies from './movies'
import websocket from './websocket'

export default combineEpics(
  movies,
  websocket
)
