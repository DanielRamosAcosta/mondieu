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
    const movies = await kodi.run('VideoLibrary.GetMovies', { properties: ['title', 'year', 'thumbnail'] })
      .then(({movies}) => movies.map(({movieid: id, thumbnail, ...data}) => ({
          ...data,
          id,
          thumbnail: decodeURIComponent(thumbnail).match(/image:\/\/(.+)\//)[1]
        }))
      )
    this.all.replace(movies)
  }
}

export default new MoviesStore()
