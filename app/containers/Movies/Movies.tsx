import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Movie from 'components/Movie'

import { fetchMovies, markViewed } from '../../modules/movies'

import { TSpropTypes, propTypes, defaultProps } from './types'
import styles from './styles'

const mapStateToProps = store => ({
  movies: store.getIn(['movies', 'all']).toJS()
})

@connect(mapStateToProps, { fetchMovies, markViewed })
export default class Movies extends Component<TSpropTypes, null> {
  static propTypes = propTypes
  static defaultProps = defaultProps

  componentWillMount () {
    !this.props.movies.length && this.props.fetchMovies()
  }

  render () {
    return (
      <div className={styles.container}>
        <section className={styles.grid}>
          {this.props.movies.map(({id, title, thumbnail, viewed, rating, genre, progress}) =>
            <Movie
              key={id}
              id={id}
              title={title}
              thumbnail={thumbnail}
              viewed={viewed}
              rating={rating}
              genre={genre}
              progress={progress}
              markViewed={this.props.markViewed}
            />)
          }
        </section>
      </div>
    )
  }
}
