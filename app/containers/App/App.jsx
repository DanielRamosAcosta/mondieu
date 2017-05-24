import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Layout, { Header, Content, Footer, Sider } from 'antd/lib/Layout'
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'

import MovieIcon from 'react-icons/lib/md/movie'
import TVShowIcon from 'react-icons/lib/md/live-tv'
import MusicIcon from 'react-icons/lib/md/music-note'
import SettingsIcon from 'react-icons/lib/md/settings'

import { Switch, Route, Redirect } from 'react-router-dom'
import { push } from 'react-router-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Movies from 'containers/Movies'

import Sidebar from 'components/Sidebar'
import Love from 'components/Love'

import { connectWebSocket } from 'modules/websocket'

import styles from './styles'

const TvShows = () => <div><p>TvShows!</p></div>
const Music = () => <div><p>Music!</p></div>
const Settings = () => <div><p>Settings!</p></div>

@connect(store => ({pathname: store.getIn(['router']).location.pathname}), { connectWebSocket, push })
export default class App extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
        createHref: PropTypes.func.isRequired
      }).isRequired,
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    }).isRequired
  }

  constructor () {
    super()
    this.onCollapse = ::this.onCollapse
    this.onChangePath = ::this.onChangePath
    this.renderTransition = ::this.renderTransition

    this.state = {
      collapsed: false,
      mode: 'inline',
      path: '/movies'
    }
  }

  componentWillMount () {
    this.props.connectWebSocket()
  }

  onCollapse = collapsed =>
    this.setState({
      collapsed,
      mode: collapsed ? 'inline' : 'vertical'
    })

  onChangePath = path => {
    this.props.pathname !== path && this.props.push(path)
  }

  renderTransition = ({ location }) =>
    <div>
      <CSSTransitionGroup
        transitionEnterTimeout={400}
        transitionLeaveTimeout={200}
        className={styles.transition}
        transitionName={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          leaveActive: styles.leaveActive
        }}
      >
        {this.renderRoutes(location)}
      </CSSTransitionGroup>
    </div>

  renderRoutes = location =>
    <Switch key={location.pathname} location={location}>
      <Route exact path='/movies' key='/movies' component={Movies}/>
      <Route exact path='/tv-shows' key='/tv-shows' component={TvShows}/>
      <Route exact path='/music' key='/music' component={Music}/>
      <Route exact path='/settings' key='/settings' component={Settings}/>
    </Switch>

  render = () =>
    <div className={styles.container}>
      <Sidebar
        collapsed={this.state.collapsed}
        mode={this.state.mode}
        onCollapse={this.onCollapse}
        className={styles.sidebar}
        path={this.props.pathname}
        onChangePath={this.onChangePath}
      />

      <div className={styles.routesContainer}>
        <Route render={this.renderTransition} />
        <Footer className={styles.footer}>
          <div className={styles.footerMessage}>
            <span>Made with</span>
            <Love className={styles.love} />
            <span>by <a href='https://github.com/DanielRamosAcosta'>@DanielRamosAcosta</a></span>
          </div>
        </Footer>
      </div>
    </div>
}

