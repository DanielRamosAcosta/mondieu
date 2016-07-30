import moment from 'moment'

export default class Player {
  constructor (ws) {
    this.ws = ws
  }

  parseResult (data) {
    Object.keys(data).forEach((key) => {
      switch (key) {
        case 'time':
        case 'totaltime': data[key] = moment.duration(data[key])
      }
    })
    if (Object.keys(data).length === 1) {
      data = data[Object.keys(data)[0]]
    }
    return data
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
        resolve(this.parseResult(res.result))
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
