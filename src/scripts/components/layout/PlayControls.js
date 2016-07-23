import React from 'react'

import { Navbar, Nav, NavItem, Col } from 'react-bootstrap'
import Icon from 'react-fontawesome'

import * as ControlActions from '../../actions/controlActions'
import MovieStore from '../../stores/ControlStore'
import Timebar from '../PlayControls/Timebar.js'

import '../../../styles/_playControls.sass'

export default class Menu extends React.Component {
  constructor () {
    super()

    this.state = {
      playing: MovieStore.isPlaying(),
      paused: MovieStore.isPaused(),
      stopped: MovieStore.isStopped(),
      timebar: 0
    }
  }

  updateControls () {
    this.setState({
      playing: MovieStore.isPlaying(),
      paused: MovieStore.isPaused(),
      stopped: MovieStore.isStopped()
    })
  }

  componentWillMount () {
    MovieStore.on('playerChanged', this.updateControls.bind(this))
  }

  componentWillUnmount () {
    MovieStore.removeListener('playerChanged', this.updateControls.bind(this))
  }

  conmutePlayPause () {
    if (this.state.playing === true) {
      ControlActions.putPause()
    } else {
      ControlActions.putPlay()
    }
  }

  stop () {
    console.log(this.state.stopped)
    if (!this.state.stopped) {
      ControlActions.putStop()
    }
  }

  getIcon () {
    if (this.state.playing === true) {
      return 'pause'
    } else {
      return 'play'
    }
  }

  changeTimebar (event) {
    this.setState({timebar: event.target.value})
  }

  render () {
    return (
      <Navbar fixedBottom>
        <Col xs={12} sm={3}>
          <ul class='playControls'>
            <NavItem eventKey={1} href='#'><Icon name='step-backward' /></NavItem>
            <NavItem eventKey={2} onClick={this.conmutePlayPause.bind(this)} ><Icon name={this.getIcon()} /></NavItem>
            <NavItem eventKey={2} onClick={this.stop.bind(this)} ><Icon name='stop' /></NavItem>
            <NavItem eventKey={4} href='#'><Icon name='step-forward' /></NavItem>
          </ul>
        </Col>
        <Col xs={12} sm={9}>
          <Timebar value={this.state.timebar} min={0} max={1000} handleChange={this.changeTimebar.bind(this)}/>
        </Col>
      </Navbar>
    )
  }
}
