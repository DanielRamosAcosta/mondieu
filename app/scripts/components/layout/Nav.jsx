import React from 'react'
import { Link } from 'react-router'

import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import AppBar from 'material-ui/AppBar'
import {Tabs, Tab} from 'material-ui/Tabs'
import Slider from 'material-ui/Slider'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

import LangStore from '../../stores/LangStore'

export default class Menu extends React.Component {
  constructor (props, context) {
    super(props, context)

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

  calculateTabs (loc) {
    let tabs = this.pages.map((page, i) => {
      return (
        <Tab
          key={i+1}
          style={this.tabStyle}
          label={this.state.lang.page[page]}
          data-route={'/' + page.toLowerCase()}
          onActive={this.handleActive.bind(this)}
        />
      )
    })
    tabs.unshift(
      <Tab
        key={0}
        style={this.tabStyle}
        label={this.state.lang.page['home']}
        data-route={'/'}
        onActive={this.handleActive.bind(this)}
      />
    )
    console.log(tabs)
    return tabs
  }

  getPagesMaterialUI (loc) {
    const { location } = this.props

    let index = this.pages.indexOf(location.pathname.substring(1)) + 1
    console.log(index)

    return(
      <Tabs class='hidden-xs' initialSelectedIndex={index}>
        {this.calculateTabs(loc)}
      </Tabs>
    )
  }

  render () {
    const { location } = this.props

    return (
      <AppBar
        title="Mondieu"
        showMenuIconButton={true}
        iconElementLeft={<IconButton class='visible-xs'><NavigationMenu /></IconButton>}
        iconElementRight={this.getPagesMaterialUI(location.pathname)}
      />
    )
  }
}

// TODO: Change into static
Menu.contextTypes = {
  router: React.PropTypes.object.isRequired
}
