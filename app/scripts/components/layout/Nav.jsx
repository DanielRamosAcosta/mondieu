import React from 'react'
import { Link } from 'react-router'

import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import AppBar from 'material-ui/AppBar'
import {Tabs, Tab} from 'material-ui/Tabs'
import Slider from 'material-ui/Slider'

import LangStore from '../../stores/LangStore'

export default class Menu extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.pages = [
      'home',
      'movies',
      'tvshows',
      'music',
      'settings'
    ]

    this.getLang = this.getLang.bind(this)
    this.state = {
      lang: LangStore.getLang()
    }

    this.tabStyle = {
      paddingLeft: 1 + 'em',
      paddingRight: 1 + 'em'
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

  handleActive (tab) {
    this.context.router.push(tab.props['data-route'])
  }

  getPagesMaterialUI (loc) {
    return(
      <Tabs class='hidden-xs' initialSelectedIndex={0}>
        {this.pages.map((page, i) => {
          return (
            <Tab
              key={i}
              style={this.tabStyle}
              label={this.state.lang.page[page]}
              data-route={'/' + page.toLowerCase()}
              onActive={this.handleActive.bind(this)}
            />
          )
        })}
      </Tabs>
    )
  }

  render () {
    const { location } = this.props

    return (
      <AppBar
        title="Mondieu"
        showMenuIconButton={true}
        iconElementRight={this.getPagesMaterialUI(location.pathname)}
      />
    )
  }
}

// TODO: Change into static
Menu.contextTypes = {
  router: React.PropTypes.object.isRequired
}
