import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

import Layout from 'components/Layout'
import Movie from 'components/Movie'

//	.col-	.col-sm-	.col-md-	.col-lg-	.col-xl-

@inject("store") @observer
export default class Movies extends Component {
  static contextTypes = {
    movieStore: PropTypes.object
  }

  componentWillMount () {
    this.props.store && this.props.store.movies.fetchMovies()
  }

  render () {
    return (
      <Layout xs={6} sm={4} md={4} lg={2}>
        {this.props.store && this.props.store.movies.all.map(movie =>
          <Movie key={movie.id} movie={movie}></Movie>
        )}
      </Layout>
    )
  }
}
