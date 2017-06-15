import React, { PropTypes, Component } from 'react'
import Icon from 'antd/lib/Icon'
import classNames from 'classnames'

import styles from './styles.sass'

export default class ImageLoader extends Component
  @propTypes =
    src: PropTypes.string.isRequired,
    className: PropTypes.string

  @defaultProps =
    className: ''

  constructor: ->
    super()

    @state =
      loaded: false

    @handleImageLoaded = @handleImageLoaded.bind @

  handleImageLoaded: ->
    @setState loaded: true

  renderProgress: ->
    <div className={classNames @props.className, styles.loader}>
      <Icon type='loading' />
    </div>

  render: ->
    <div className={classNames "#{styles.containerUnloaded}": @state.loaded}>
      <img
        className={classNames @props.className, styles.image,
          "#{styles.loaded}": @state.loaded,
          "#{styles.unloaded}": !@state.loaded
        }
        src={@props.src}
        onLoad={@handleImageLoaded}
        alt=''
      />
      {not @state.loaded and @renderProgress()}
    </div>
