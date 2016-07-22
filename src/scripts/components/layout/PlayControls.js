import React from 'react'

import { Navbar, Nav, NavItem } from 'react-bootstrap'

import Icon from 'react-fontawesome'

import LangStore from '../../stores/LangStore'

export default class Menu extends React.Component {
  constructor () {
    super()

    this.getLang = this.getLang.bind(this)
    this.state = {
      lang: LangStore.getLang()
    }
  }

  getLang () {
    this.setState({
      lang: LangStore.getLang()
    })
  }

  componentWillMount () {
    LangStore.on('change', this.getLang)
  }

  componentWillUnmount () {
    LangStore.removeListener('change', this.getLang)
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
            <NavItem eventKey={2} href='#'><Icon name='play' /></NavItem>
            <NavItem eventKey={3} href='#'><Icon name='step-forward' /></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
