import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Layout from 'components/Layout'
import Movie from 'components/Movie'

import { fetchMovies, markViewed } from 'modules/movies'

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
      <Layout xs={6} sm={4} md={4} lg={2}>
        {this.props.movies.map(movie =>
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            thumbnail={movie.thumbnail}
            viewed={movie.viewed}
            markViewed={this.props.markViewed}
          />
        )}
      </Layout>
    )
  }
}
