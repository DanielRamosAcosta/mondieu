import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

import Movie from 'components/Movie'

@inject("store") @observer
export default class Movies extends Component {
  static contextTypes = {
    movieStore: PropTypes.object
  }

  componentWillMount () {
    this.props.store.movies.fetchMovies()
  }

  render () {
    return (
      <div>
        {this.props.store.movies.all.map(movie =>
          <Movie key={movie.id} movie={movie}></Movie>
        )}
      </div>
    )
  }
}
