import createReducer from 'utils/create-reducer'
import { fromJS } from 'immutable'

const initialState = fromJS({
  all: []
})

// Actions
export const FETCH_MOVIES         = 'mondieu/movies/FETCH_MOVIES'
export const FETCH_MOVIES_SUCCESS = 'mondieu/movies/FETCH_MOVIES_SUCCESS'
export const UPDATE_MOVIE         = 'mondieu/movies/UPDATE_MOVIE'
export const MARK_VIEWED          = 'mondieu/movies/MARK_VIEWED'

// Reducers
const handlers = {
  [FETCH_MOVIES_SUCCESS]: (state, movies) =>
    state
      .set('all', fromJS(movies)),
  [UPDATE_MOVIE]: (state, data) =>
    state
      .updateIn(['all'], movies =>
        movies.update(movies.findIndex(item => item.get('id') === data.item.id), movie =>
          movie.set('viewed', data.playcount)
        )
      )
}

// Action Creators
export const fetchMovies = () =>
  ({
    type: FETCH_MOVIES
  })

export const markViewed = (id, status) =>
  ({
    type: MARK_VIEWED,
    payload: {id, status}
  })

export default createReducer(initialState, handlers)
