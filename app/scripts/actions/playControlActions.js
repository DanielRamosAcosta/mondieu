export function ExecuteAction (action, origin) {
  return {
    type: 'EXECUTE_ACTION',
    payload: { action, origin }
  }
}

export function Seek (time, origin) {
  return {
    type: 'SEEK',
    payload: { time, origin }
  }
}

export function GetControlState () {
  return {
    type: 'FETCH_CONTROL',
    payload: null
  }
}

export function GetTimebarState () {
  return {
    type: 'FETCH_TIMEBAR',
    payload: null
  }
}

// TODO: ver si esto sirve para algo
export function CurrentTime () {
  return {
    type: 'CURRENT_TIME',
    payload: null
  }
}

export function MaxTime () {
  return {
    type: 'MAX_TIME',
    payload: null
  }
}

export function FetchControls () {
  return {
    type: 'FETCH_CONTROLS',
    payload: null
  }
}
