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
