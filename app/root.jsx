import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'

import RootApp from 'containers/App'
import store from './stores'

import './styles/global'

const root = document.getElementById('root')

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} >
        <Component />
      </Provider>
    </AppContainer>,
    root
  )
}

render(RootApp)

if (process.env.NODE_ENV !== 'production') {
  module && module.hot && module.hot.accept('./containers/App', () => {
    render(RootApp)
  })
}

const a = new WebSocket('ws://localhost:9090/jsonrpc')
