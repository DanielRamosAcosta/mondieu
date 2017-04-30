import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import RootApp from './containers/App'

import { Provider } from 'mobx-react'
import store from './stores'

import './styles/global'
import 'antd/dist/antd.css'

const root = document.getElementById('root')

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
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
