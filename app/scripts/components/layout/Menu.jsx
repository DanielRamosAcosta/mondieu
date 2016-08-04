import React from 'react'

import _ from 'lodash'

import AppBar from 'material-ui/AppBar'
import {Tabs, Tab} from 'material-ui/Tabs'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import '../../../styles/_menu'

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
      lang: LangStore.getLang(),
      open: false
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

  toggleDrawer () {
    this.setState({open: !this.state.open})
  }

  pushPage (event) {
    let name = event.target.innerHTML.match(/.+-->(.+)<!--.+/)[1]
    let page = _.findKey(this.state.lang.page, _.partial(_.isEqual, name))
    let pathname = page === 'home' ? '/' : `/${page}`
    this.context.router.push(pathname)
    this.toggleDrawer()
  }

  handleActive (tab) {
    this.context.router.push(tab.props['data-route'])
  }

  getTabs (loc) {
    let index = this.pages.indexOf(loc.substring(1))
    if (index === -1) {
      index = 0
    }

    return (
      <Tabs class='hidden-xs' initialSelectedIndex={index}>
        {this.pages.map((page, i) => {
          return (
            <Tab
              class='navBarTab'
              key={i}
              label={this.state.lang.page[page]}
              data-route={`/${i === 0 ? '' : page.toLowerCase()}`} // if home redirect to /
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
      <div>
        <AppBar
          title='Mondieu'
          iconElementLeft={<IconButton class='visible-xs' onClick={this.toggleDrawer.bind(this)}><NavigationMenu /></IconButton>}
          iconElementRight={this.getTabs(location.pathname)}
        />
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={this.toggleDrawer.bind(this)}
        >
          {this.pages.map((page, i) => {
            return (
              <MenuItem
                key={i}
                onTouchTap={this.pushPage.bind(this)}
              >
                {this.state.lang.page[page]}
            </MenuItem>
            )
          })}
        </Drawer>
      </div>
    )
  }
}

// TODO: Change into static
Menu.contextTypes = {
  router: React.PropTypes.object.isRequired
}

Menu.PropTypes = {
  location: React.PropTypes.object.isRequired
}
