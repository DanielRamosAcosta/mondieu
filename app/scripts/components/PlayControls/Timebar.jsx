import React from 'react'

export default class Timebar extends React.Component {
  render () {
    return (
      <input
        type='range'
        value={this.props.value}
        min={this.props.min}
        max={this.props.max}
        onInput={this.props.handleChange}
        step={this.props.step}
      />
    )
  }
}
