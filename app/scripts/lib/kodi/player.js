import moment from 'moment'

export default class Player {
  constructor (ws) {
    this.ws = ws
    console.log(moment)
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

  Seek (playerid, params) {
    return new Promise((resolve, reject) => {
      if (typeof params === 'number') {
        this.ws.sendAnd('Player.Seek', {
          playerid: playerid,
          value: params
        }).then((res) => {
          if (res.error) {
            reject(res.error)
            return
          }
          resolve(res.result)
        })
      } else {
        reject('Unimplemented')
      }
    })
  }

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
    this.ws.on('Player.OnPause', ({ data }) => cb(data))
  }

  OnPlay (cb) {
    this.ws.on('Player.OnPlay', ({ data }) => cb(data))
  }

  // Player.OnPropertyChanged

  OnSeek (cb) {
    this.ws.on('Player.OnSeek', ({ data }) => {
      data.player.seekoffset = moment.duration(data.player.seekoffset)
      data.player.time = moment.duration(data.player.time)
      cb(data)
    })
  }

  // Player.OnSpeedChanged

  OnStop (cb) {
    this.ws.on('Player.OnStop', ({ data }) => cb(data))
  }
}
