import PropTypes from 'prop-types'

export interface TSpropTypes {
  readonly label: string
  readonly path: string
  readonly Icon: any
}

export const propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  Icon: PropTypes.string.isRequired
}
