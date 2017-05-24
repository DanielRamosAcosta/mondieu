import PropTypes from 'prop-types'

export interface TSpropTypes {
  readonly id: number
  readonly title: string
  readonly thumbnail: string
  readonly viewed: boolean
  markViewed(status: boolean, id: number): any
  readonly rating: number
  readonly genre: ReadonlyArray<string>
  readonly progress: number
}

export const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  viewed: PropTypes.bool.isRequired,
  markViewed: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
  genre: PropTypes.arrayOf(PropTypes.string).isRequired,
  progress: PropTypes.number.isRequired
}
