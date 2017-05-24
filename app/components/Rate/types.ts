import PropTypes from 'prop-types'

export interface TSpropTypes {
  readonly value: number
  readonly max?: number
}

export const propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number
}

export const defaultProps = {
  max: 5
}
