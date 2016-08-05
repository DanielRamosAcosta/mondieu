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
      console.log('soy EXECUTE_ACTION')
      console.log(action.payload)
      if (action.payload.action === 'play') {
        return {...state, PlayPauseIcon: 'pause'}
      }
      if (action.payload.action === 'pause') {
        return {...state, PlayPauseIcon: 'play'}
      }
      if (action.payload.action === 'stop') {
        return {...state, PlayPauseIcon: 'play', timebar: 0}
      }
    }
    case 'SEEK': {
      console.log(action.payload)
      let maxTime = moment.duration({hours: 3})
      // TODO: Quitar el maxtime este
      return {
        ...state,
        timebar: Math.floor((action.payload.time.asMilliseconds() * state.totalBar) / maxTime.asMilliseconds()),
        maxtime: maxTime,
        time: action.payload
      }
    }
  }
  return state
}
