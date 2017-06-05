import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Slider from 'components/Slider'
import PlayControls from 'components/PlayControls'

import styles from './styles'

const mapStateToProps = store => ({
  movies: store.getIn(['movies', 'all']).toJS()
})

const cssbool = bool => `calc(${bool * 1})`

@connect(mapStateToProps)
export default class TimeBar extends Component {
  constructor () {
    super()
    this.state = {
      percentage: 25,
      open: true
    }
  }

  render () {
    return (
      <div style={{'--open': cssbool(this.state.open)}}>
        <div className={styles.container}>
          <PlayControls />
          <Slider value={this.state.percentage} onChange={value => this.setState({percentage: value})} />
        </div>
        <div className={styles.placeholder}/>
      </div>
    )
  }
}
