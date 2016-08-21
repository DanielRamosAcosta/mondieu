export default function reducer(state={
  list: []
}, action) {
  switch (action.type) {
    case 'FETCH_MOVIES_FULFILLED': {
      return {...state, list: action.payload}
    }
  }
  return state
}
