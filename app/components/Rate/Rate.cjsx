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

renderHalf = (value) ->
  decimalPart = value - Math.floor(value)
  if decimalPart is 0
    return null
  if decimalPart < 0.25
    return EmptyStar()
  if 0.25 <= decimalPart < 0.75
    return HalfStar()
  if decimalPart > 0.75
    return FullStar()

Rate = ({ value, max }) ->
  <div>
    {[0...Math.floor(value)].map FullStar}
    {renderHalf value}
    {[Math.ceil(value)...max].map EmptyStar}
  </div>

Rate.propTypes =
  value: PropTypes.number.isRequired,
  max: PropTypes.number

Rate.defaultProps =
  max: 5

export default Rate
