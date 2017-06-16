import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Movie from 'components/Movie'

import { fetchMovies, markViewed } from 'modules/movies'

import styles from './styles'

mapStateToProps = (store) ->
  movies: store.getIn(['movies', 'all']).toJS()

connect_to_redux = connect(mapStateToProps, {fetchMovies, markViewed})

Movies = connect_to_redux class extends Component
  @defaultProps =
    movies: []

  componentWillMount: ->
    !@props.movies.length && @props.fetchMovies()

  render: ->
    <div className={styles.container}>
      <section className={styles.grid}>
        {@props.movies.map (movie) =>
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            thumbnail={movie.thumbnail}
            viewed={movie.viewed}
            rating={movie.rating}
            genre={movie.genre}
            progress={movie.progress}
            markViewed={@props.markViewed}
          />
        }
      </section>
    </div>

export default Movies
