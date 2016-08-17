import React from 'react'

import { Col } from 'react-bootstrap'
import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/Card'
import PlayIcon from 'material-ui/svg-icons/av/play-circle-outline'
import FavoriteBorderIcon from 'material-ui/svg-icons/action/favorite-border'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever'
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

import '~/styles/_movie'


export default class Movie extends React.Component {
  static PropTypes = {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    year: React.PropTypes.number.isRequired,
    image: React.PropTypes.string.isRequired,
    favorite: React.PropTypes.bool.isRequired,
    favorite: React.PropTypes.bool.viewed
  }

  render () {
    return (
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
  }
}
