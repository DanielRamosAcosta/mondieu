const createReducer = (initialState, handlers) =>
   (state = initialState, action = {}) =>
    handlers[action.type]
    ? handlers[action.type](state, action.payload)
    : state

export default createReducer
