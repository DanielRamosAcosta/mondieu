import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, /* hashHistory,*/ browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'

import Layout from '~/scripts/pages/Layout'
import store from './store'

import Home from '~/scripts/pages/Home'
import Movies from '~/scripts/pages/Movies'
import Music from '~/scripts/pages/Music'
import TVShows from '~/scripts/pages/TVShows'
import Settings from '~/scripts/pages/Settings'

import '~/styles/Bootstrap'
import 'font-awesome/css/font-awesome.css'
import '~/styles/common'

const app = document.getElementById('app')
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

ReactDOM.render(
  // TODO: see if we can switch to browserHistory
  <Provider store={store} >
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Home} />
          <Route path='home' name='home' component={Home} />
          <Route path='movies' name='movies' component={Movies} />
          <Route path='music' name='music' component={Music} />
          <Route path='tvshows' name='tvshows' component={TVShows} />
          <Route path='settings' name='settings' component={Settings} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
app)
