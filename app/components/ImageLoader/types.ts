import PropTypes from 'prop-types'

export interface TSpropTypes {
  src: string
  className: string
}

export interface TSstateTypes {
  loaded: boolean
}

export const propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string
}

export const defaultProps = {
  className: ''
}
