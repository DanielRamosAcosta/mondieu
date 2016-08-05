export default function reducer(state={
  movies: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'FETCH_MOVIES': {
      return {...state, fetching: true}
    }
    case 'FETCH_MOVIES_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'FETCH_MOVIES_FULFILLED': {
      return {...state, fetching: false, movies: action.payload}
    }
  }
  return state
}
