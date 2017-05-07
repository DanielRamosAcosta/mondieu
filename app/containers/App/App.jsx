import React, { Component } from 'react'
import { connect } from 'react-redux'
import Movies from 'containers/Movies'

import Layout, { Header, Content, Footer, Sider } from 'antd/lib/Layout'
import Menu from 'antd/lib/Menu'
import Icon from 'antd/lib/Icon'
import Button from 'antd/lib/Button'

import MovieIcon from 'react-icons/lib/md/movie'
import TVShowIcon from 'react-icons/lib/md/live-tv'
import MusicIcon from 'react-icons/lib/md/music-note'
import SettingsIcon from 'react-icons/lib/md/settings'

import Sidebar from 'components/Sidebar'

import { connectWebSocket } from 'modules/websocket'

import styles from './styles'

const mapStateToProps = store => ({})

@connect(mapStateToProps, { connectWebSocket })
export default class App extends Component {
  componentWillMount () {
    this.props.connectWebSocket()
  }

  state = {
    collapsed: false,
    mode: 'inline',
    path: '/movies'
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'inline' : 'vertical',
    });
  }

  onChangePath = ({ key: path }) => {
    this.setState({ path })
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render = () =>
    <div style={{display: 'flex'}}>
      <Sidebar
        collapsed={this.state.collapsed}
        mode={this.state.mode}
        onCollapse={::this.onCollapse}
        style={{position: 'fixed', zIndex: 1000, height: '100%'}}
        className={styles.sidebar}
        path={this.state.path}
        onChangePath={::this.onChangePath}
      />

      <div style={{width: '100%'}}>
        <Movies />
        <Footer className={styles.footer}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </div>
    </div>
}

