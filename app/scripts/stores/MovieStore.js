import { EventEmitter } from 'events'

// import * as MovieActions from '~/scripts/actions/movieActions'

import dispatcher from '~/scripts/dispatcher'

class MovieStore extends EventEmitter {
  // constructor () {
  //   super()
  // }

  handleActions (action) {
    switch (action.type) {
      case 'DUMMY': {
        this.dummy = true
        this.emit('change')
        break
      }
    }
  }
}

const movieStore = new MovieStore()
dispatcher.register(movieStore.handleActions.bind(movieStore))

export default movieStore
