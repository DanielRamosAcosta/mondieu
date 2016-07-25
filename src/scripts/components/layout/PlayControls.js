import React from 'react'

import { Navbar, NavItem, Col } from 'react-bootstrap'
import Icon from 'react-fontawesome'

import * as ControlActions from '../../actions/controlActions'
import ControlStore from '../../stores/ControlStore'
import Timebar from '../PlayControls/Timebar.js'

import '../../../styles/_playControls.sass'

export default class Menu extends React.Component {
  constructor () {
    super()

    this.totalBar = 2000

    this.state = {
      playing: ControlStore.isPlaying(),
      paused: ControlStore.isPaused(),
      stopped: ControlStore.isStopped(),
      timebar: 0,
      totaltime: ControlStore.getCurrentTotalTime()
    }
  }

  updateControls () {
    this.setState({
      playing: ControlStore.isPlaying(),
      paused: ControlStore.isPaused(),
      stopped: ControlStore.isStopped()
    })
  }

  updateTotalTime () {
    this.setState({
      totaltime: ControlStore.getCurrentTotalTime()
    })
  }

  updateTimebar () {
    let time = ControlStore.getCurrentPlayTime()
    let max = this.state.totaltime
    console.log(time)
    console.log(max)
    console.log('===========================')
    let base = new Date(0, 0, 0, 0, 0, 0, 0)
    let currentMS = time - base
    let maxMS = max - base
    this.setState({
      timebar: Math.floor((currentMS * this.totalBar) / maxMS)
    })
  }

  componentWillMount () {
    ControlStore.on('playerChanged', this.updateControls.bind(this))
    ControlStore.on('playerTimeChanged', this.updateTimebar.bind(this))
    ControlStore.on('maxTimeChanged', this.updateTotalTime.bind(this))
    // document.addEventListener('keydown', this.conmutePlayPause.bind(this), false)
  }

  componentWillUnmount () {
    ControlStore.removeListener('playerChanged', this.updateControls.bind(this))
    ControlStore.removeListener('playerTimeChanged', this.updateTimebar.bind(this))
    ControlStore.removeListener('maxTimeChanged', this.updateTotalTime.bind(this))
    // document.removeEventListener('keydown', this.conmutePlayPause.bind(this), false)
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
          <Timebar value={this.state.timebar} min={0} max={this.totalBar} handleChange={this.changeTimebar.bind(this)}/>
        </Col>
      </Navbar>
    )
  }
}
