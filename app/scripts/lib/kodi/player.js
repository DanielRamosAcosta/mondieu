export default class Player {
  constructor (ws) {
    this.ws = ws
  }

  // Methods
  GetActivePlayers () {
    return new Promise((resolve, reject) => {
      this.ws.sendAnd('Player.GetActivePlayers').then((res) => {
        if (res.error) {
          reject(res.error)
          return
        }
        resolve(res.result)
      })
    })
  }

  // GetItem

  GetProperties (playerid, params) {
    return new Promise((resolve, reject) => {
      if (params.constructor === String) {
        params = [params]
      }
      this.ws.sendAnd('Player.GetProperties', {
        properties: params,
        playerid: playerid
      }).then((res) => {
        if (res.error) {
          reject(res.error)
          return
        }
        if (Object.keys(res.result).length === 1) {
          resolve(res.result[Object.keys(res.result)[0]])
        } else {
          resolve(res.result)
        }
      })
    })
  }

  // GoTo
  // Move
  // Open
  // PlayPause
  // Rotate
  // Seek
  // SetAudioStream
  // SetPartymode
  // SetRepeat
  // SetShuffle
  // SetSpeed
  // SetSubtitle
  // Stop
  // Zoom

  // Notifications
  OnPause (cb) {
    this.ws.on('Player.OnPause', cb)
  }

  OnPlay (cb) {
    this.ws.on('Player.OnPlay', cb)
  }

  // Player.OnPropertyChanged

  OnSeek (cb) {
    this.ws.on('Player.OnSeek', cb)
  }

  // Player.OnSpeedChanged

  OnStop (cb) {
    this.ws.on('Player.OnStop', cb)
  }
}
