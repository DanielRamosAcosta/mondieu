import { combineReducers } from 'redux'

import playControls from './playControlsReducer'
import movies from './moviesReducer'

export default combineReducers({
  playControls,
  movies
})
