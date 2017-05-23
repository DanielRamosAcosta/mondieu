import { applyMiddleware, createStore } from 'redux'

import { createEpicMiddleware } from 'redux-observable'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'

import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './modules'
import rootEpic from './epics'

export default function configureStore (history) {
  const composeEnhancers = composeWithDevTools({})

  const middleware = [
    createEpicMiddleware(rootEpic),
    routerMiddleware(history)
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

  return store
}
