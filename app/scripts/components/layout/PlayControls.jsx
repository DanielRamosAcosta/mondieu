import React from 'react'
import moment from 'moment'

// External components
import { Navbar, Col } from 'react-bootstrap'

// Custom components
import Timeline from '~/scripts/components/PlayControls/Timeline'
import Controls from '~/scripts/components/PlayControls/Controls'
import TimePassedDuration from '~/scripts/components/PlayControls/TimePassedDuration'

// Redux stuff
import { connect } from 'react-redux'
import { fetchControls, fetchTime, executeAction, seek } from '~/scripts/actions/kodiActions'

// Styles
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
export default class PlayControls extends React.Component { // TODO: cuando se está reproduciendo, añadir padding al body
  constructor () {
    super()
    this.state = {
      timelineVal: 0
    }
    this.timelineTotal = 2000
  }

  componentWillReceiveProps (props) {
    if (this.props.connected !== props.connected) {
      if (props.connected === true) {
        this.props.dispatch(fetchTime())
        this.props.dispatch(fetchControls())
      }
    }

    let nowms = props.time.asMilliseconds()
    let maxms = props.totaltime.asMilliseconds()
    let maxpt = this.timelineTotal
    let nowpt = Math.floor((nowms * maxpt) / maxms)

    if(isNaN(nowpt))
      nowpt = 0

    this.setState({
      timelineVal: nowpt
    })
  }

  interactionTimebar (percentage) {
    let newtime = moment.duration({milliseconds: (this.props.totaltime.asMilliseconds() * percentage)/100})
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
            min={0}
            max={this.timelineTotal}
            value={this.state.timelineVal}
            onChange={this::this.interactionTimebar}
          />
        </Col>
      </Navbar>
    )
  }
}
