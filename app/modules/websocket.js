import createReducer from 'utils/create-reducer'
import { fromJS } from 'immutable'

const initialState = fromJS({

})

// Actions
export const CONNECT = 'mondieu/webscoket/CONNECT'
export const DISCONNECT = 'mondieu/webscoket/DISCONNECT'
export const RECEIVE_MESSAGE = 'mondieu/webscoket/RECEIVE_MESSAGE'
export const SEND_MESSAGE = 'mondieu/webscoket/SEND_MESSAGE'

// Reducers
const handlers = {}

// Action Creators
export const connectWebSocket = () =>
  ({
    type: CONNECT
  })

export const sendMessage = (method, params) =>
  ({
    type: SEND_MESSAGE,
    payload: {method, params}
  })

export default createReducer(initialState, handlers)
