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
