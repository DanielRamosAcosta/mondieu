import React from 'react'
import PropTypes from 'prop-types'
import Eye from 'react-icons/fa/eye'
import EyeSlash from 'react-icons/fa/eye-slash'
import classNames from 'classnames'

import styles from './styles'

Viewed = ({onToggle, viewed, id}) ->
  <div>
    <button className={styles.button} onClick={e => onToggle !viewed, id}>
      <Eye className={classNames styles.eye, "#{styles.eyeHide}": !viewed} />
      <EyeSlash className={classNames styles.eyeSlash, "#{styles.eyeSlashHide}": viewed} />
    </button>
  </div>

Viewed.propTypes =
  viewed: PropTypes.bool
  id: PropTypes.oneOfType [
    PropTypes.string
    PropTypes.number
  ]
  onToggle: PropTypes.func

Viewed.defaultProps =
  viewed: false
  id: null
  onToggle: ->

export default Viewed
