import React from 'react'

import { NavItem } from 'react-bootstrap'
import Icon from 'react-fontawesome'


export default class Controls extends React.Component {
  onPlayPause (event) {
    if (this.props.playing) {
      this.props.onPause(event)
    } else {
      this.props.onPlay(event)
    }
  }

  render () {
    return (
      <ul class={this.props.className}>
        <NavItem eventKey={1} href='#'><Icon name='step-backward' /></NavItem>
        <NavItem eventKey={2} onClick={this::this.onPlayPause} ><Icon name={this.props.playing ? 'pause' : 'play'} /></NavItem>
        <NavItem eventKey={2} onClick={this.props.onStop} ><Icon name='stop' /></NavItem>
        <NavItem eventKey={4} href='#'><Icon name='step-forward' /></NavItem>
      </ul>
    )
  }
}
