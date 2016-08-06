import moment from 'moment'

export default function reducer(state={
  PlayPauseIcon: 'play',
  timebar: 0,
  totalBar: 2000,
  time: moment.duration(0),
  maxTime: moment.duration(0)
}, action) {
  switch (action.type) {
    case 'EXECUTE_ACTION': {
      if (action.payload === 'play') {
        return {...state, PlayPauseIcon: 'pause'}
      }
      if (action.payload === 'pause') {
        return {...state, PlayPauseIcon: 'play'}
      }
      if (action.payload === 'stop') {
        return {...state, PlayPauseIcon: 'play', timebar: 0}
      }
    }
    case 'SEEK': {
      console.log(action.payload)
      return {
        ...state,
        timebar: Math.floor((action.payload.asMilliseconds() * state.totalBar) / state.maxTime.asMilliseconds()),
        time: action.payload
      }
    }
    case 'FETCH_TIMEBAR_FULFILLED': {
      console.log(action.payload)
      let { time, totaltime } = action.payload
      return {
        ...state,
        timebar: Math.floor((time.asMilliseconds() * state.totalBar) / totaltime.asMilliseconds()),
        time: time,
        // TODO: Cambiar maxTime ---> totaltime
        maxTime: totaltime
      }
    }
    case 'FETCH_CONTROLS_FULFILLED': {
      if (action.payload === 'pause') {
        return {...state, PlayPauseIcon: 'play'}
      }
      if (action.payload === 'play') {
        return {...state, PlayPauseIcon: 'pause'}
      }
      if (action.payload === 'stop') {
        // TODO: Hide controls: true
        return {...state, PlayPauseIcon: 'play', timebar: 0}
      }
    }
  }
  return state
}
