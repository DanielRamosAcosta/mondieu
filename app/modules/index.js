import { combineReducers } from 'redux-immutable'

import movies from './movies'

const reducers = combineReducers({
  movies
})

export default reducers
