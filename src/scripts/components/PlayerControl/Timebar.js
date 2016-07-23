import React from 'react'

export default class Timebar extends React.Component {
  constructor () {
    super()
  }

  render () {
    const { location } = this.props

    return (
      <input
        type='range'
        value = { this.props.value }
        min = { this.props.min }
        max = { this.props.max }
        onInput = { this.props.handleChange }
        onChange = { this.handleOnChange }
        step = { this.props.step }/>
    )
  }
}
