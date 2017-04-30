import { applyMiddleware, createStore } from 'redux'

import { createEpicMiddleware } from 'redux-observable'
import { createLogger } from 'redux-logger'

import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './modules'
import rootEpic from './epics'

const composeEnhancers = composeWithDevTools({})

const middleware = [
  createEpicMiddleware(rootEpic)
]

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    stateTransformer: state => state.toJS()
  })

  middleware.push(logger)
}

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middleware)
))

export default store
