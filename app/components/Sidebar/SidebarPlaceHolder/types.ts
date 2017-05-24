import PropTypes from 'prop-types'

export interface TSpropTypes {
  readonly collapsed?: boolean
}

export const propTypes = {
  collapsed: PropTypes.bool
}

export const defaultProps = {
  collapsed: false
}
