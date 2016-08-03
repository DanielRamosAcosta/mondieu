import React from 'react'
import Slider from 'material-ui/Slider'

import '../../../styles/_timebar.sass'

export default class Timebar extends React.Component {
  constructor () {
    super()
    this.styles = {
      marginTop: 15,
      marginBottom: 0
    }
  }
  render () {
    return (
      <Slider
        class='timebar'
        value={this.props.value}
        min={this.props.min}
        max={this.props.max}
        onChange={this.props.onChange}
        onDragStop={this.props.onDragStop}
      />
    )
  }
}
