import React from 'react'
import PropTypes from 'prop-types'

import Full from 'react-icons/lib/fa/star'
import Empty from 'react-icons/lib/fa/star-o'
import Half from 'react-icons/lib/fa/star-half-empty'

import styles from './styles.sass'

FullStar = (key) ->
  <Full className={styles.star} key={key} />

EmptyStar = (key) ->
  <Empty className={styles.star} key={key} />

HalfStar = (key) ->
  <Half className={styles.star} key={key} />

renderFull = (value) ->
  [0...Math.floor(value)].map FullStar

renderEmpty = (value, max) ->
  [Math.ceil(value)...max].map EmptyStar

renderHalf = (value) ->
  reminder = value - Math.floor(value)
  if reminder is 0
    return null
  if reminder < 0.25
    return EmptyStar()
  if 0.25 <= reminder < 0.75
    return HalfStar()
  if reminder > 0.75
    return FullStar()

Rate = ({ value, max }) ->
  <div>
    {renderFull value}
    {renderHalf value}
    {renderEmpty value, max}
  </div>

Rate.propTypes =
  value: PropTypes.number.isRequired,
  max: PropTypes.number

Rate.defaultProps =
  max: 5

export default Rate
