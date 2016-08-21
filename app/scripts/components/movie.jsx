import React from 'react'

import { Col } from 'react-bootstrap'
import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/Card'
import PlayIcon from 'material-ui/svg-icons/av/play-circle-outline'
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

import '~/styles/_movie'


export default class Movie extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return false
  }

  render () {
    let algo = (
      <Col xs={6} sm={4} md={2}>
        <Card class='movie'>
          <CardHeader
            class='movie-header'
            title={this.props.title}
            subtitle={this.props.year}
          />
          <CardMedia
            class='movie-media'
            onClick={() => {console.log(`Redirigir a la info de la peli ${this.props.id}`)}}
          >
            <img src={this.props.image} />
          </CardMedia>
          <CardActions class='movie-actions'>
            <IconButton><PlayIcon onClick={() => {console.log(`Reproducir peli con ID ${this.props.id}`)}}/></IconButton>
              <Checkbox
                defaultChecked={this.props.favorite}
                style={{ display: 'inline-block', width: '29px' }}
                checkedIcon={<ActionFavorite />}
                uncheckedIcon={<ActionFavoriteBorder />}
              />
              <Checkbox
                defaultChecked={this.props.viewed}
                style={{ display: 'inline-block', width: '29px' }}
              />
          </CardActions>
        </Card>
      </Col>
    )
    return algo
  }
}

/*

Antiguo:
<Col xs={6} sm={4} md={2}>
  <div class="card">
    <div class="card-image">
        <img class="img-responsive" src={this.props.image}/>
        <span class="card-title">{this.props.title}</span>
        <span class="card-subtitle">{this.props.year}</span>
    </div>

    <div class="card-action">
      <IconButton><PlayIcon onClick={() => {console.log(`Reproducir peli con ID ${this.props.id}`)}}/></IconButton>
        <Checkbox
          defaultChecked={this.props.favorite}
          style={{ display: 'inline-block', width: '29px' }}
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
        />
        <Checkbox
          defaultChecked={this.props.viewed}
          style={{ display: 'inline-block', width: '29px' }}
        />
    </div>
  </div>
</Col>

 */
