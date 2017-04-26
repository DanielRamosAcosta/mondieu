import React from 'react'

const Movie = ({movie}) =>
  <div>
    <img src={movie.thumbnail} height='200'/>
    {movie.title}
  </div>

export default Movie
