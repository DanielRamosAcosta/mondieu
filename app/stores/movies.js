import { observable } from 'mobx'

import Kodi from 'utils/websocket'

class Movie {
  @observable title;

  constructor (data) {
    this.id = data.id
    this.title = data.title
  }
}

class MoviesStore {
  @observable all = []

  createMovie (data) {
    this.all.push(new Movie(data))
  }

  async fetchMovies () {
    const kodi = await Kodi
    const movies = await kodi.run('VideoLibrary.GetMovies', { sort: {order: 'ascending', method: 'title'}, properties: ['title', 'year', 'thumbnail', 'playcount'] })
      .then(({movies}) => movies.map(({movieid: id, thumbnail, playcount, ...data}) => ({
          ...data,
          id,
          viewed: playcount,
          thumbnail: thumbnail && decodeURIComponent(thumbnail).match(/image:\/\/(.+)\//)[1]
        }))
      )
      .then(e => {
        console.log(e)
        return e
      })
    this.all.replace(movies)
  }
}

export default new MoviesStore()
