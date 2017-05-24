import PropTypes from 'prop-types'

export interface TSpropTypes {
  readonly viewed?: boolean
  readonly id?: number
  onToggle(viewed: boolean, id: number): any
}

export const propTypes = {
  viewed: PropTypes.bool,
  id: PropTypes.number,
  onToggle: PropTypes.func
}

export const defaultProps = {
  viewed: false,
  id: 0,
  onToggle () {}
}
