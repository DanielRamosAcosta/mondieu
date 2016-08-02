import React from 'react'

import Nav from '../components/layout/Nav'
import PlayControls from '../components/layout/PlayControls'
import EasyTransition from 'react-easy-transition'

export default class Layout extends React.Component {
  render () {
    const { location, history } = this.props

    return (
      <div>
        <Nav location={location} history={history} />
        <div class='container main'>
          <EasyTransition
            path={location.pathname}
            initialStyle={{opacity: 0}}
            transition='opacity 0.2s ease-in'
            finalStyle={{opacity: 1}}
          >
            {this.props.children}
          </EasyTransition>
        </div>
        <PlayControls />
      </div>
    )
  }
}
