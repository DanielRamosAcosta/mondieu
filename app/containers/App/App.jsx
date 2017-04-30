import React, { Component } from 'react'
import { connect } from 'react-redux'
import Movies from 'containers/Movies'

import { connectWebSocket } from 'modules/websocket'

const mapStateToProps = store => ({})

@connect(mapStateToProps, { connectWebSocket })
export default class App extends Component {
  componentWillMount () {
    this.props.connectWebSocket()
  }

  render = () =>
    <div>
      <span>Hello World!!</span>
      <Movies />
    </div>
}

