import React from 'react'

import styles from './styles'

const Movie = ({ movie }) =>
  <div className={styles.container}>
    <div>
      <img src={movie.thumbnail} className={styles.thumbnail}/>
    </div>
    <div>
      {movie.title}
    </div>
  </div>

export default Movie
