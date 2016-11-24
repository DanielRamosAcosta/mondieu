import React from 'react'

import { Row, Grid, Col } from 'react-bootstrap'
import Movie from '~/scripts/components/movie'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress'
import RefreshIndicator from 'material-ui/RefreshIndicator'

import InfiniteScroll from 'react-infinite-scroller'

import { loadMore } from '~/scripts/actions/kodiActions'

@connect((store) => {
  return {
    connected: store.playControls.connected,
    list: store.movies.list
  }
})
export default class Movies extends React.Component {
  constructor () {
    super()
    this.state = {
      movies: [],
      hasMoreItems: true
    }

    // TODO: esperar a que salga la siguiente versión de material-ui para poner la clase.
    this.loader = (
      <Grid>
        <Row>
          <Col xs={2} xsOffset={5}>
            <RefreshIndicator
              size={40}
              left={10}
              top={0}
              status='loading'
              className='refresh-indicator'
            />
          </Col>
        </Row>
      </Grid>
    )

    this.lastItem = 0
  }

  renderTracks () {
    return this.props.list.map((movie, i) => {
      return (
        <Movie
          id={movie.id}
          key={i}
          title={movie.title}
          year={movie.year}
          image={movie.thumbnail}
          favorite={movie.favorite}
          viewed={movie.viewed}
        />
      )
    })
  }

  loadItems () {
    /*
    setTimeout(() => {
      let newMovies = this.state.movies.concat([
        {id: 7, title: 'Avatar', year: 2009, image: 'http://placehold.it/387x552', favorite: false, viewed: false},
        {id: 8, title: 'Avatar', year: 2009, image: 'http://placehold.it/387x552', favorite: false, viewed: false},
        {id: 9, title: 'Avatar', year: 2009, image: 'http://placehold.it/387x552', favorite: false, viewed: false},
        {id: 10, title: 'Avatar', year: 2009, image: 'http://placehold.it/387x552', favorite: false, viewed: false},
        {id: 11, title: 'Avatar', year: 2009, image: 'http://placehold.it/387x552', favorite: false, viewed: false},
        {id: 12, title: 'Avatar', year: 2009, image: 'http://placehold.it/387x552', favorite: false, viewed: false}
      ])

      this.setState({
        movies: newMovies
      })
    }, 100)*/
    if (this.props.connection) {
      this.props.dispatch(loadMore(6, this.lastItem))
      this.lastItem+=6
    }
  }

  componentWillMount () {
    if (this.props.connected !== this.props.connected) {
      console.log(this.props.connected)
      if (this.props.connected === true) {
        console.log('Voy a pedir seis peliculas')
        this.props.dispatch(loadMore(6, this.lastItem))
        this.lastItem+=6
      }
    }
  }

  componentWillReceiveProps (props) {
    if (this.props.connected !== props.connected) {
      console.log(props.connected)
      if (props.connected === true) {
        console.log('Voy a pedir seis peliculas')
        this.props.dispatch(loadMore(6, this.lastItem))
        this.lastItem+=6
      }
    }
    console.log(props)
  }

  render () {
    const items = this.renderTracks()

    return (
      <div>
          <InfiniteScroll
            pageStart={0}
            loadMore={this::this.loadItems}
            hasMore={this.state.hasMoreItems}
            loader={this.loader}>

            <Grid>
                {items}
            </Grid>
          </InfiniteScroll>
      </div>
    )
  }
}


/*



 */
