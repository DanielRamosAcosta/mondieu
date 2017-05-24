import React, { Component } from 'react'
import Icon from 'antd/lib/icon'
import classNames from 'classnames'

import styles from './styles.sass'

import { TSpropTypes, TSstateTypes, propTypes, defaultProps } from './types'

class ImageLoader extends Component<TSpropTypes, TSstateTypes> {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor () {
    super()

    this.state = {
      loaded: false
    }

    this.handleImageLoaded = this.handleImageLoaded.bind(this)
  }

  handleImageLoaded = () =>
    this.setState({
      loaded: true
    })

  renderProgress = () =>
    <div className={classNames(this.props.className, styles.loader)}>
      <Icon type='loading' />
    </div>

  // TODO: Mover el replace al logic
  render () {
    return (
      <div className={this.state.loaded ? '' : styles.containerUnloaded}>
        <img
          className={classNames(this.props.className, styles.image, {
            [styles.loaded]: this.state.loaded,
            [styles.unloaded]: !this.state.loaded
          })}
          src={this.props.src.replace('original', 'w342')}
          onLoad={this.handleImageLoaded}
          alt=''
        />
        {!this.state.loaded && this.renderProgress()}
      </div>
    )
  }
}

export default ImageLoader
