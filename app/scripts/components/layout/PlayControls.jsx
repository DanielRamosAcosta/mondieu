import React from 'react'

import { Navbar, NavItem, Col } from 'react-bootstrap'
import Icon from 'react-fontawesome'

import * as ControlActions from '../../actions/controlActions'
import ControlStore from '../../stores/ControlStore'
import Timebar from '../PlayControls/Timebar'

import '../../../styles/_playControls'

export default class Menu extends React.Component {
  constructor () {
    super()

    this.totalBar = 2000

    this.state = {
      timebar: 0,
      PlayPauseIcon: 'play'
    }
  }

  componentWillMount () {
    ControlStore.on('OnNewCurrentTime', this.OnNewCurrentTime.bind(this))
    ControlStore.on('OnPlay', this.OnPlay.bind(this))
    ControlStore.on('OnPause', this.OnPause.bind(this))
    ControlStore.on('OnStop', this.OnStop.bind(this))
    // document.addEventListener('keydown', this.conmutePlayPause.bind(this), false)
  }

  componentWillUnmount () {
    ControlStore.removeListener('OnNewCurrentTime', this.OnNewCurrentTime.bind(this))
    ControlStore.removeListener('OnPlay', this.OnPlay.bind(this))
    ControlStore.removeListener('OnPause', this.OnPause.bind(this))
    ControlStore.removeListener('OnStop', this.OnStop.bind(this))
    // document.removeEventListener('keydown', this.conmutePlayPause.bind(this), false)
  }

  OnNewCurrentTime () {
    // let time = ControlStore.getCurrentPlayTime()
    let time = ControlStore.state.currentTime
    let max = ControlStore.state.totalTime
    this.setState({
      timebar: Math.floor((time.asMilliseconds() * this.totalBar) / max.asMilliseconds())
    })
  }

  OnPlay () {
    this.setState({PlayPauseIcon: 'pause'})
  }

  OnPause () {
    this.setState({PlayPauseIcon: 'play'})
  }

  OnStop () {
    this.setState({PlayPauseIcon: 'play', timebar: 0})
  }

  interactionPlayPause () {
    // If current icon is pause, it means that is playing something
    if (this.state.PlayPauseIcon === 'pause') {
      ControlActions.OnPause()
    } else {
      ControlActions.OnPlay()
    }
  }

  interactionStop () {
    if (!ControlStore.state.stop) {
      ControlActions.OnStop()
    }
  }

  interactionTimebar (event) {
    this.setState({timebar: event.target.value})
  }

  render () {
    return (
      <Navbar fixedBottom>
        <Col xs={12} sm={3}>
          <ul class='playControls'>
            <NavItem eventKey={1} href='#'><Icon name='step-backward' /></NavItem>
            <NavItem eventKey={2} onClick={this.interactionPlayPause.bind(this)} ><Icon name={this.state.PlayPauseIcon} /></NavItem>
            <NavItem eventKey={2} onClick={this.interactionStop.bind(this)} ><Icon name='stop' /></NavItem>
            <NavItem eventKey={4} href='#'><Icon name='step-forward' /></NavItem>
          </ul>
        </Col>
        <Col xs={12} sm={9}>
          <Timebar value={this.state.timebar} min={0} max={this.totalBar} handleChange={this.interactionTimebar.bind(this)} />
        </Col>
      </Navbar>
    )
  }
}
