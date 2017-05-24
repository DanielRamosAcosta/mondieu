import * as React from 'react'

import Full from 'react-icons/fa/star'
import Empty from 'react-icons/fa/star-o'
import Half from 'react-icons/fa/star-half-empty'
import times from 'lodash/times'

import { TSpropTypes, propTypes, defaultProps } from './types'
import * as styles from './styles.sass'

const renderWhole = (number: number) =>
  times(number).map((key: number) =>
    <Full key={key} />
  )

const renderHalf = (number: number) => {
    if (number < 0.25) return <Empty />
    if (number >= 0.25 && number < 0.75) return <Half />
    return <Full />
}

const renderEmpty = (number: number) =>
  times(number).map((key: number) =>
    <Empty key={key} />
  )

const Rate: React.StatelessComponent<TSpropTypes> = ({ value, max }) =>
  <div className={styles.rate}>
    {renderWhole(Math.floor(value))}
    {renderHalf(value - Math.floor(value))}
    {renderEmpty(max - 1 - Math.floor(value))}
  </div>

Rate.propTypes = propTypes
Rate.defaultProps = defaultProps

export default Rate
