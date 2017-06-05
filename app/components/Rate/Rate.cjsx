import React from 'react'
import PropTypes from 'prop-types'

import Full from 'react-icons/fa/star'
import Empty from 'react-icons/fa/star-o'
import Half from 'react-icons/fa/star-half-empty'
import times from 'lodash/times'

import styles from './styles'

renderWhole = (number) ->
  times number
  .map (key) ->
    <Full className={styles.star} key={key} />

renderHalf = (number) ->
  if number < 0.25
    <Empty className={styles.star} />
  if 0.25 <= number < 0.75
    <Half className={styles.star} />
  else
    <Full className={styles.star} />

renderEmpty = (number) ->
  times number
  .map (key) ->
    <Empty className={styles.star} key={key} />

Rate = ({ value, max }) ->
  <div>
    {renderWhole(Math.floor(value))}
    {renderHalf(value - Math.floor(value))}
    {renderEmpty(max - 1 - Math.floor(value))}
  </div>

Rate.propTypes =
  value: PropTypes.number.isRequired,
  max: PropTypes.number

Rate.defaultProps =
  max: 5

export default Rate
