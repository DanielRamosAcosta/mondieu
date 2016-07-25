import React from 'react'
import { Link } from 'react-router'

import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import LangStore from '../../stores/LangStore'

export default class Menu extends React.Component {
  constructor () {
    super()
    this.pages = [
      'movies',
      'tvshows',
      'music',
      'settings'
    ]

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

  getPages (loc) {
    return this.pages.map((page, i) => {
      return (
        <LinkContainer to={'/' + page.toLowerCase()} key={i}>
          <NavItem eventKey={i}>{this.state.lang.page[page]}</NavItem>
        </LinkContainer>
      )
    })
  }

  render () {
    const { location } = this.props

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Mondieu</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.getPages(location.pathname)}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
