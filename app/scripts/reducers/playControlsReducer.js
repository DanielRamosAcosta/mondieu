import moment from 'moment'

export default function reducer(state={
  connected: false,
  playing: false,
  time: moment.duration(0),
  totaltime: moment.duration(0),
  hidden: true
}, action) {
  switch (action.type) {
    case 'KODI_CONNECT_FULFILLED': {
      return {...state, connected: true}
    }
    case 'FETCH_TIME_FULFILLED': {
      return {
        ...state,
        time: action.payload.time,
        totaltime: action.payload.totaltime
      }
    }
    case 'FETCH_CONTROLS_FULFILLED':
    case 'EXECUTE_ACTION': {
      switch (action.payload) {
        case 'pause': return {...state, playing: false, hidden: false}
        case 'play': return {...state, playing: true, hidden: false}
        case 'stop': return {...state, playing: false, timebar: 0, hidden: true}
        default: throw new Error(`Unkown control type ${action.payload}`)
      }
    }
    case 'SEEK': {
      return {
        ...state,
        time: action.payload
      }
    }
  }
  return state
}
