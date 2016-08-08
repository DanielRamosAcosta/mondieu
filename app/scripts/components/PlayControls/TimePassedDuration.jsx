import React from 'react'

import '~/styles/_TimePassedDuration'

export default class TimePassedDuration extends React.Component {
  addMissingZero (times) {
    return times.map(item => {
      if (item.toString().length === 1) {
        item = '0' + item
      }
      return item
    })
  }

  getTimeFormatted (time, duration) {
    let timeArray = []
    let durationArray = [];

    ['hours', 'minutes', 'seconds'].forEach(measure => {
      if (duration[measure]() === 0) return
      timeArray.push(time[measure]())
      durationArray.push(duration[measure]())
    })
    return `${this.addMissingZero(timeArray).join(':')} / ${this.addMissingZero(durationArray).join(':')}`
  }

  render () {
    let { time, totaltime } = this.props
    let duration = totaltime
    let className = this.props.className || 'TimePassedDuration'
    // TODO: Hacer que el tiempo vaya acorde a la Timeline
    return (
      <span class={className}>
        {this.getTimeFormatted(time, duration)}
      </span>
    )
  }
}
