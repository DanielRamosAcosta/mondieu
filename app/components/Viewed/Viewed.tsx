import * as React from 'react'
import PropTypes from 'prop-types'
import Eye from 'react-icons/fa/eye'
import EyeSlash from 'react-icons/fa/eye-slash'
import classNames from 'classnames'

import { TSpropTypes, propTypes, defaultProps } from './types'
import styles from './styles.sass'

const Viewed: React.StatelessComponent<TSpropTypes> = ({ id, viewed, onToggle }) =>
  <div>
    <button className={styles.button} onClick={e => onToggle(!viewed, id)}>
      <Eye className={classNames(styles.eye, {[styles.eyeHide]: !viewed})} />
      <EyeSlash className={classNames(styles.eyeSlash, {[styles.eyeSlashHide]: viewed})} />
    </button>
  </div>

Viewed.propTypes = propTypes
Viewed.defaultProps = defaultProps

export default Viewed
