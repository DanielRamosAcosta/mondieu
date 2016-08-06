import React from 'react'

import { Navbar, NavItem, Col } from 'react-bootstrap'
import Icon from 'react-fontawesome'

// import * as ControlActions from '~/scripts/actions/controlActions'
// import ControlStore from '~/scripts/stores/ControlStore'
import Timebar from '~/scripts/components/PlayControls/Timebar'

import { connect } from 'react-redux'
import { ExecuteAction, Seek, GetTimebarState, FetchControls } from '../../actions/playControlActions'

import '~/styles/_playControls'

import Kodi from '~/scripts/lib/kodi/kodi' // TODO: Cambiar kodi por index

@connect((store) => {
  return {
    PlayPauseIcon: store.playControls.PlayPauseIcon,
    timebar: store.playControls.timebar,
    totalBar: store.playControls.totalBar,
    time: store.playControls.time,
    maxTime: store.playControls.maxTime
  }
})
export default class PlayControls extends React.Component {
  constructor () {
    super()

    this.timebar = 0
  }

  componentWillMount () {
    /*
    ControlStore.on('OnNewCurrentTime', this.OnNewCurrentTime.bind(this))
    ControlStore.on('OnPlay', this.OnPlay.bind(this))
    ControlStore.on('OnPause', this.OnPause.bind(this))
    ControlStore.on('OnStop', this.OnStop.bind(this))*/
    console.log(this.props)
    this.props.dispatch(GetTimebarState())
    this.props.dispatch(FetchControls())
    // document.addEventListener('keydown', this.conmutePlayPause.bind(this), false)
  }
  /*
  componentWillUnmount () {
    ControlStore.removeListener('OnNewCurrentTime', this.OnNewCurrentTime.bind(this))
    ControlStore.removeListener('OnPlay', this.OnPlay.bind(this))
    ControlStore.removeListener('OnPause', this.OnPause.bind(this))
    ControlStore.removeListener('OnStop', this.OnStop.bind(this))
    // document.removeEventListener('keydown', this.conmutePlayPause.bind(this), false)
  }

  OnNewCurrentTime () {
    // let time = ControlStore.getCurrentPlayTime()
    if (!this.movingTimebar) {
      let time = ControlStore.state.currentTime
      let max = ControlStore.state.totalTime
      this.setState({
        timebar: Math.floor((time.asMilliseconds() * this.totalBar) / max.asMilliseconds())
      })
    }
  }*/

  interactionPlayPause () {
   this.props.dispatch(ExecuteAction(this.props.PlayPauseIcon))
  }

  interactionStop () {
    this.props.dispatch(ExecuteAction('stop'))
  }

  interactionTimebar () {
    // ControlActions.OnSeek()
    this.props.dispatch(Seek((this.timebar * 100) / this.props.totalBar))
  }

  changingTimebar (_, value) {
    this.timebar = value
  }

  render () {
    return (
      <Navbar fixedBottom class='text-center navPlayControls'>
        <Col xs={12} sm={3}>
          <ul class='playControls'>
            <NavItem eventKey={1} href='#'><Icon name='step-backward' /></NavItem>
            <NavItem eventKey={2} onClick={this.interactionPlayPause.bind(this)} ><Icon name={this.props.PlayPauseIcon} /></NavItem>
            <NavItem eventKey={2} onClick={this.interactionStop.bind(this)} ><Icon name='stop' /></NavItem>
            <NavItem eventKey={4} href='#'><Icon name='step-forward' /></NavItem>
          </ul>
        </Col>
        <Col xs={12} sm={9}>
          <Timebar value={this.props.timebar} min={0} max={this.props.totalBar} onDragStop={this.interactionTimebar.bind(this)} onChange={this.changingTimebar.bind(this)}/>
        </Col>
      </Navbar>
    )
  }
}
