import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'

import movies from './movies'

const reducers = combineReducers({
  movies,
  router: routerReducer
})

export default reducers
