import React from 'react'

import { Navbar, Col } from 'react-bootstrap'

import Timeline from '~/scripts/components/PlayControls/Timeline'
import Controls from '~/scripts/components/PlayControls/Controls'
import TimePassedDuration from '~/scripts/components/PlayControls/TimePassedDuration'
import moment from 'moment'

import { connect } from 'react-redux'
import { ExecuteAction, FetchTimebar, FetchControls } from '../../actions/playControlActions'
import { fetchControls, fetchTime, executeAction, seek } from '~/scripts/actions/kodiActions'

import '~/styles/_playControls'

@connect((store) => {
  return {
    connected: store.playControls.connected,
    hidden: store.playControls.hidden,
    playing: store.playControls.playing,
    time: store.playControls.time,
    totaltime: store.playControls.totaltime
  }
})
export default class PlayControls extends React.Component {
  constructor () {
    super()
    this.state = {
      actualTotal: 0,
      timelineVal: 0
    }
    this.timelineTotal = 2000
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
    this.setState({
      timelineVal: Math.floor((props.time.asMilliseconds() * this.timelineTotal) / props.totaltime.asMilliseconds())
    })
  }

  interactionTimebar (percentage) {
    let newtime = moment.duration({milliseconds: (this.props.totaltime.asMilliseconds() * percentage)/100})
    console.log(`${newtime.hours()}:${newtime.minutes()}:${newtime.seconds()}`)
    this.props.dispatch(seek(newtime))
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
            value={this.state.timelineVal}
            min={0}
            max={this.timelineTotal}
            onChange={this::this.interactionTimebar}
          />
        </Col>
      </Navbar>
    )
  }
}
