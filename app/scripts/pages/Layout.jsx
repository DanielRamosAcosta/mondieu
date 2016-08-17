import React from 'react'

import Menu from '~/scripts/components/Layout/Menu'
import PlayControls from '~/scripts/components/Layout/PlayControls'
import EasyTransition from 'react-easy-transition'
import * as kodi from '~/scripts/actions/kodiActions'
import { connect } from 'react-redux'

@connect((store) => {
  return {
    playing: store.playControls.playing,
    timebar: store.playControls.timebar,
    totalBar: store.playControls.totalBar,
    time: store.playControls.time,
    totaltime: store.playControls.totaltime,
    hidden: store.playControls.hidden
  }
})
export default class Layout extends React.Component {
  componentWillMount () {
    this.props.dispatch(kodi.connect())
  }

  render () {
    const { location, history } = this.props

    return (
      <div>
        <Menu location={location} history={history} />

        <div class='main'>
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
