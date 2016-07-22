import React from 'react'

import { Navbar, Nav, NavItem } from 'react-bootstrap'
import Icon from 'react-fontawesome'

import * as MovieActions from '../../actions/controlActions'
import MovieStore from '../../stores/ControlStore'


export default class Menu extends React.Component {
  constructor () {
    super()

    this.state = {
      played: MovieStore.isPlay(),
      paused: MovieStore.isPause()
    }
  }

  getPlayPause () {
    console.log('Me han cambiado el play/pause')
    this.setState({
      played: MovieStore.isPlay(),
      paused: MovieStore.isPause()
    })
    console.log(this.getIcon())
  }

  componentWillMount () {
    MovieStore.on('change', this.getPlayPause.bind(this))
  }

  componentWillUnmount () {
    MovieStore.removeListener('change', this.getPlayPause.bind(this))
  }

  conmutePlayPause () {
    if (this.state.played === true) {
      MovieActions.putPause()
    } else {
      MovieActions.putPlay()
    }
  }

  getIcon () {
    if (this.state.played !== true) {
      return 'play'
    } else {
      return 'pause'
    }
  }

  render () {
    return (
      <Navbar fixedBottom>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href='#'><Icon name='step-backward' /></NavItem>
            <NavItem eventKey={2} onClick={this.conmutePlayPause.bind(this)} ><Icon name={this.getIcon()} /></NavItem>
            <NavItem eventKey={3} href='#'><Icon name='step-forward' /></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
