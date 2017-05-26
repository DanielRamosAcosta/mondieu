import PropTypes from 'prop-types'

import { TSpropTypes as MovieTSPropTypes, propTypes as MoviePropTypes } from 'components/Movie'

export interface TSpropTypes {
  readonly movies: ReadonlyArray<MovieTSPropTypes>
  fetchMovies(): any
}

export const propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(MoviePropTypes)),
  fetchMovies: PropTypes.func.isRequired
}

export const defaultProps = {
  movies: []
}
