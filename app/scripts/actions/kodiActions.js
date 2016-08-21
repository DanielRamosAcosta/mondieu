export function connect () {
  return {
    type: 'KODI_CONNECT'
  }
}

export function fetchTime () {
  return {
    type: 'FETCH_TIME'
  }
}

export function fetchControls () {
  return {
    type: 'FETCH_CONTROLS'
  }
}

export function executeAction (action, origin) {
  return {
    type: 'EXECUTE_ACTION',
    payload: { action, origin }
  }
}

export function seek (time, origin) {
  return {
    type: 'SEEK',
    payload: { time, origin }
  }
}

export function loadMore (cuantity, lastItem) {
  return {
    type: 'FETCH_MOVIES',
    payload: { cuantity, lastItem }
  }
}
