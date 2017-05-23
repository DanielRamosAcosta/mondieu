import React from 'react'
import PropTypes from 'prop-types'

import Full from 'react-icons/fa/star'
import Empty from 'react-icons/fa/star-o'
import Half from 'react-icons/fa/star-half-empty'
import times from 'lodash/times'

import styles from './styles'

const renderWhole = number =>
  times(number).map(key =>
    <Full className={styles.star} key={key} />
  )

const renderHalf = number => {
    if (number < 0.25) return <Empty className={styles.star} />
    if (number >= 0.25 && number < 0.75) return <Half className={styles.star} />
    return <Full className={styles.star} />
}

const renderEmpty = number =>
  times(number).map(key =>
    <Empty className={styles.star} key={key} />
  )

const Rate = props =>
  <div>
    {renderWhole(Math.floor(props.value))}
    {renderHalf(props.value - Math.floor(props.value))}
    {renderEmpty(props.max - 1 - Math.floor(props.value))}
  </div>

Rate.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number
}

Rate.defaultProps = {
  max: 5
}

export default Rate
