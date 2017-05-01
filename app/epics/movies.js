import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/filter'

import { FETCH_MOVIES, UPDATE_MOVIE, MARK_VIEWED } from 'modules/movies'
import { sendMessage, RECEIVE_MESSAGE } from 'modules/websocket'


const fetchMovies = action$ =>
  action$.ofType(FETCH_MOVIES)
    .mapTo(sendMessage('VideoLibrary.GetMovies', {
      sort: {order: 'ascending', method: 'title'},
      properties: ['title', 'year', 'thumbnail', 'playcount', 'resume', 'rating', 'genre']
    }))

const markViewed = action$ =>
  action$.ofType(MARK_VIEWED)
    .map(action => action.payload)
    .map(({id, status}) => sendMessage('VideoLibrary.SetMovieDetails', {
      movieid: id,
      playcount: status ? 1 : 0
    }))

const receiveMovies = action$ =>
  action$.ofType(RECEIVE_MESSAGE)
    .filter(action => action.payload.id === 'VideoLibrary.GetMovies')
    .map(action => action.payload.result.movies)
    .map(movies => movies.map(({movieid: id, thumbnail, rating, playcount, resume, ...data}) => ({
        ...data,
        id,
        viewed: playcount,
        thumbnail: `/image/${encodeURIComponent(thumbnail)}`,
        rating: Math.round(rating) / 2,
        progress: ((resume.position * 100) / resume.total) || 0
      }))
    )
    .map(foo => {
      console.log(foo)
      return foo.slice(0, 40)
    })
    .map(movies => ({
      type: `${FETCH_MOVIES}_SUCCESS`,
      payload: movies
    }))

const updateMovies = action$ =>
  action$.ofType(RECEIVE_MESSAGE)
    .filter(action => action.payload.method === 'VideoLibrary.OnUpdate')
    .map(action => action.payload.params.data)
    .map(data => ({
      type: UPDATE_MOVIE,
      payload: data
    }))

const epics = combineEpics(fetchMovies, receiveMovies, updateMovies, markViewed)

export default epics
