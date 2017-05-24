import PropTypes from 'prop-types'

export interface TSpropTypes {
  readonly collapsed: boolean
  onCollapse(collapsed: boolean): any
  readonly mode: 'vertical' | 'horizontal' | 'inline'
  readonly path: string
  onChangePath(path: string): any
}

export const propTypes = {
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func,
  mode: PropTypes.string,
  path: PropTypes.string.isRequired,
  onChangePath: PropTypes.func.isRequired
}

export const defaultProps = {
  collapsed: false,
  onCollapse () {},
  mode: 'inline'
}
