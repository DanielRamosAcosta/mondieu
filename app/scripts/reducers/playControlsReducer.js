import moment from 'moment'

export default function reducer(state={
  connected: false,
  playing: false,
  timebar: 0,
  totalBar: 2000,
  time: moment.duration(0),
  totaltime: moment.duration(0),
  hidden: false
}, action) {
  console.log(action)
  console.log(action.type)
  switch (action.type) {
    case 'KODI_CONNECT_FULFILLED': {
      return {...state, connected: true}
    }
    case 'FETCH_TIME_FULFILLED': {
      console.log(action.payload)
      return {
        ...state,
        timebar: Math.floor((action.payload.time.asMilliseconds() * state.totalBar) / action.payload.totaltime.asMilliseconds()),
        time: action.payload.time,
        totaltime: action.payload.totaltime
      }
    }
    case 'EXECUTE_ACTION': {
      if (action.payload === 'play') {
        return {...state, playing: true, hidden: false}
      }
      if (action.payload === 'pause') {
        return {...state, playing: false, hidden: false}
      }
      if (action.payload === 'stop') {
        return {...state, playing: false, timebar: 0, hidden: true}
      }
    }
    case 'SEEK': {
      return {
        ...state,
        timebar: Math.floor((action.payload.asMilliseconds() * state.totalBar) / state.totaltime.asMilliseconds()),
        time: action.payload
      }
    }
    case 'FETCH_CONTROLS_FULFILLED': {
      if (action.payload === 'pause') {
        return {...state, playing: false, hidden: false}
      }
      if (action.payload === 'play') {
        return {...state, playing: true, hidden: false}
      }
      if (action.payload === 'stop') {
        return {...state, playing: false, timebar: 0, hidden: true}
      }
    }
  }
  return state
}
