import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

import styles from './styles'

const Love = ({ className }) =>
  <div className={classNames(styles.heart, className)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <path
        d='M24.85 10.126C26.868 5.343 31.478 2 36.84 2c7.223 0 12.425 6.18 13.08 13.544 0 0 .352 1.828-.425 5.12-1.058 4.48-3.545 8.463-6.898 11.502L24.85 48 7.402 32.165c-3.353-3.038-5.84-7.02-6.898-11.503-.777-3.29-.424-5.12-.424-5.12C.734 8.18 5.936 2 13.16 2c5.362 0 9.672 3.343 11.69 8.126z'
      />
    </svg>
  </div>

Love.proptypes = {
  className: PropTypes.string
}

Love.defaultProps = {
  className: ''
}

export default Love
