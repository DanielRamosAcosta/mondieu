import React from 'react'

import { Navbar, Col } from 'react-bootstrap'

import Timeline from '~/scripts/components/PlayControls/Timeline'
import Controls from '~/scripts/components/PlayControls/Controls'
import TimePassedDuration from '~/scripts/components/PlayControls/TimePassedDuration'

import { connect } from 'react-redux'
import { ExecuteAction, Seek, FetchTimebar, FetchControls } from '../../actions/playControlActions'
import { fetchControls, fetchTime, executeAction } from '~/scripts/actions/kodiActions'

import '~/styles/_playControls'

@connect((store) => {
  return {
    connected: store.playControls.connected,
    playing: store.playControls.playing,
    timebar: store.playControls.timebar,
    totalBar: store.playControls.totalBar,
    time: store.playControls.time,
    totaltime: store.playControls.totaltime,
    hidden: store.playControls.hidden
  }
})
export default class PlayControls extends React.Component {
  constructor () {
    super()
    this.state = {
      actualTotal: 0
    }
  }

  componentWillMount () {
    console.log(this.props)
    // this.props.dispatch(FetchTimebar())
    // this.props.dispatch(FetchControls())
  }

  componentWillReceiveProps (props) {
    console.log(props)
    console.log(this.props)
    if (this.props.connected !== props.connected) {
      if (props.connected === true) {
        console.log('Acabamos de conectarnos')
        // TODO: inicializar lo que sea necesario (timeline y controles)
        this.props.dispatch(fetchTime())
        this.props.dispatch(fetchControls())
        // FETCH_CONTROLS
      }
    }
  }

  interactionTimebar (percentage) {
    this.props.dispatch(Seek(percentage))
  }

  render () {
    let { time, totaltime } = this.props
    let className = this.props.className || 'navPlayControls'
    // TODO: Averiguar como transitar el hidden
    return (
      <Navbar hidden={this.props.hidden} fixedBottom class={`text-center ${className}`}>
        <Col xs={6} sm={3}>
          <Controls
            class='playControls'
            playing={this.props.playing}
            onPause={() => this.props.dispatch(executeAction('pause'))}
            onPlay={() => this.props.dispatch(executeAction('play'))}
            onStop={() => this.props.dispatch(executeAction('stop'))}
          />
        </Col>
        <Col xs={6} smPush={7} sm={2}>
          <TimePassedDuration
            time={this.props.time}
            totaltime={this.props.totaltime}
          />
        </Col>
        <Col xs={12} smPull={2} sm={7}>
          <Timeline
            value={this.props.timebar}
            min={0}
            max={this.props.totalBar}
            onChange={this::this.interactionTimebar}
            onInput={val => { this.setState({actualTotal: val}) } }
          />
        </Col>
      </Navbar>
    )
  }
}
