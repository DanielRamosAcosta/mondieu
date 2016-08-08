import React from 'react'
import Slider from 'material-ui/Slider'

import '~/styles/_timeline'

export default class Timebar extends React.Component {
  onChange (_, value) {
    this.value = value
    if (this.props.onInput)
      this.props.onInput(this.value)
  }

  onDragStop () {
    this.props.onChange((this.value * 100) / this.props.max)
  }

  render () {
    let className = this.props.className || 'Timeline'
    return (
      <Slider
        class={className}
        value={this.props.value}
        min={this.props.min}
        max={this.props.max}
        onChange={this::this.onChange}
        onDragStop={this::this.onDragStop}
      />
    )
  }
}
