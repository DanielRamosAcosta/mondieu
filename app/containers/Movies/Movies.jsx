import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Movie from 'components/Movie'

import { fetchMovies, markViewed } from 'modules/movies'

import styles from './styles'

const mapStateToProps = store => ({
  movies: store.getIn(['movies', 'all']).toJS()
})

@connect(mapStateToProps, { fetchMovies, markViewed })
export default class Movies extends Component {
  static defaultProps = {
    movies: []
  }

  componentWillMount () {
    this.props.fetchMovies()
  }

  render () {
    return (
      <div className={styles.container}>
        <section className={styles.grid}>
          {this.props.movies.map(movie =>
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              thumbnail={movie.thumbnail}
              viewed={movie.viewed}
              rating={movie.rating}
              genre={movie.genre}
              progress={movie.progress}
              markViewed={this.props.markViewed}
            />
          )}
        </section>
      </div>
    )
  }
}
