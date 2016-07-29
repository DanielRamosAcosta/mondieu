export default class Input {
  constructor (ws) {
    this.ws = ws
  }

  // Methods
  // Back
  // ContextMenu
  // Down

  ExecuteAction (action) {
    return new Promise((resolve, reject) => {
      this.ws.sendAnd('Input.ExecuteAction', {action}).then((res) => {
        if (res.error) {
          reject(res.error)
          return
        }
        resolve(res.result)
      })
    })
  }

  // Home
  // Info
  // Left
  // Right
  // Select
  // SendText
  // ShowCodec
  // ShowOSD
  // Up

  // Notifications
  // OnInputFinished
  // OnInputRequested
}
