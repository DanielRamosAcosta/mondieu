import React from 'react'

import { Navbar, NavItem, Col } from 'react-bootstrap'
import Icon from 'react-fontawesome'

// import * as ControlActions from '~/scripts/actions/controlActions'
// import ControlStore from '~/scripts/stores/ControlStore'
import Timebar from '~/scripts/components/PlayControls/Timebar'

import { connect } from 'react-redux'
import { ExecuteAction, Seek, FetchTimebar, FetchControls } from '../../actions/playControlActions'

import '~/styles/_playControls'

@connect((store) => {
  return {
    PlayPauseIcon: store.playControls.PlayPauseIcon,
    timebar: store.playControls.timebar,
    totalBar: store.playControls.totalBar,
    time: store.playControls.time,
    totaltime: store.playControls.totaltime
  }
})
export default class PlayControls extends React.Component {
  constructor () {
    super()

    this.timebar = 0
  }

  componentWillMount () {
    this.props.dispatch(FetchTimebar())
    this.props.dispatch(FetchControls())
  }

  interactionPlayPause () {
   this.props.dispatch(ExecuteAction(this.props.PlayPauseIcon))
  }

  interactionStop () {
    this.props.dispatch(ExecuteAction('stop'))
  }

  interactionTimebar () {
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
