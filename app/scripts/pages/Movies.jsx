import React from 'react'

import { Row, Grid } from 'react-bootstrap'
import Movie from '~/scripts/components/movie'

export default class Movies extends React.Component {
  render () {
    return (
      <Grid fluid>
        <div class='movie-grid'>
          <Row>
          </Row>
        </div>
      </Grid>
    )
  }
}
