import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, /* hashHistory,*/ browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Layout from './pages/Layout'

import Home from './pages/Home'
import Movies from './pages/Movies'
import Music from './pages/Music'
import TVShows from './pages/TVShows'
import Settings from './pages/Settings'

import '../styles/Bootstrap'
import 'font-awesome/css/font-awesome.css'
import '../styles/common'

const app = document.getElementById('app')
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

ReactDOM.render(
  // TODO: see if we can switch to browserHistory
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
  </MuiThemeProvider>,
app)
