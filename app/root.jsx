import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { HashRouter as Router } from 'react-router-dom'

import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import RootApp from './containers/App'

import { Provider } from 'react-redux'
import configureStore from './store'

import './styles/global'
import 'antd/dist/antd.css'

const history = createHistory({
  basename: '/'
})

const store = configureStore(history)

const root = document.getElementById('root')

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    root
  )
}

render(RootApp)

if (process.env.NODE_ENV !== 'production') {
  module.hot.accept('./containers/App', () => {
    render(RootApp)
  })
}
