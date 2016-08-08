import moment from 'moment'

export default function reducer(state={
  playing: false,
  timebar: 0,
  totalBar: 2000,
  time: moment.duration(0),
  totaltime: moment.duration(0),
  hidden: true
}, action) {
  switch (action.type) {
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
    case 'FETCH_TIMEBAR_FULFILLED': {
      let { time, totaltime } = action.payload
      return {
        ...state,
        timebar: Math.floor((time.asMilliseconds() * state.totalBar) / totaltime.asMilliseconds()),
        time: time,
        totaltime: totaltime
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
