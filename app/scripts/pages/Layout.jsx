import React from 'react'

import Menu from '~/scripts/components/Layout/Menu'
import PlayControls from '~/scripts/components/Layout/PlayControls'
import EasyTransition from 'react-easy-transition'

export default class Layout extends React.Component {
  render () {
    const { location, history } = this.props

    return (
      <div>
        <Menu location={location} history={history} />
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
