import React, { PropTypes, Component } from 'react'
import Icon from 'antd/lib/Icon'
import classNames from 'classnames'

import styles from './styles.sass'

class ImageLoader extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  constructor () {
    super()

    this.state = {
      loaded: false
    }

    this.handleImageLoaded = ::this.handleImageLoaded
  }

  // Debug : Math.floor(Math.random() * 10) > 5 &&
  handleImageLoaded = () =>
    this.setState({
      loaded: true
    })

  renderProgress = () =>
    <div className={classNames(this.props.className, styles.loader)}>
      <Icon type='loading' />
    </div>

  render = () =>
    <div className={this.state.loaded ? '' : styles.containerUnloaded}>
      <img
        className={classNames(this.props.className, styles.image, {
          [styles.loaded]: this.state.loaded,
          [styles.unloaded]: !this.state.loaded
        })}
        src={this.props.src}
        onLoad={this.handleImageLoaded}
        alt=''
      />
      {!this.state.loaded && this.renderProgress()}
    </div>
}

export default ImageLoader
