import React from 'react'
import PropTypes from 'prop-types'

import Full from 'react-icons/fa/star'
import Empty from 'react-icons/fa/star-o'
import Half from 'react-icons/fa/star-half-empty'
import times from 'lodash/times'

import styles from './styles'

FullStar = (key) ->
  <Full className={styles.star} key={key} />

EmptyStar = (key) ->
  <Empty className={styles.star} key={key} />

HalfStar = (key) ->
  <Half className={styles.star} key={key} />

renderWhole = (value) ->
  times Math.floor value
  .map FullStar

renderEmpty = (value, max) ->
  number = max - 1 - Math.floor(value)
  times number
  .map EmptyStar

renderHalf = (value) ->
  reminder = value - Math.floor(value)
  if reminder < 0.25
    EmptyStar()
  if 0.25 <= reminder < 0.75
    HalfStar()
  else
    FullStar()

Rate = ({ value, max }) ->
  <div>
    {renderWhole value}
    {renderHalf value}
    {renderEmpty value, max}
  </div>

Rate.propTypes =
  value: PropTypes.number.isRequired,
  max: PropTypes.number

Rate.defaultProps =
  max: 5

export default Rate
