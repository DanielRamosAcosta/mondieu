import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles'

const Slider = ({ value=75, onChange, ...other }) =>
  <div className={styles.slider} style={{'--current-percentage': `${value}%`}}>
    <input type='range' onChange={e => onChange(parseFloat(e.target.value))} {...other} min="0" max="100" step="any" value={value.toString()}/>
  </div>

export default Slider
