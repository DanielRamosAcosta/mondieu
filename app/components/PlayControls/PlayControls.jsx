import React from 'react'
import PropTypes from 'prop-types'

import Play from 'react-icons/fa/play'
import Back from 'react-icons/fa/step-backward'
import Forward from 'react-icons/fa/step-forward'

import styles from './styles'

const PlayControls = ({ ...other }) =>
  <div className={styles.container}>
    <Back className={styles.back} />
    <Play className={styles.play} />
    <Forward className={styles.forward} />
  </div>

export default PlayControls
