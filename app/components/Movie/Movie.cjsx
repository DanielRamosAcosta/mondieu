import React from 'react'
import Button from 'antd/lib/Button'
import Rate from 'components/Rate'
import Viewed from 'components/Viewed'
import classNames from 'classnames'
import Play from 'react-icons/fa/play'

import ImageLoader from 'components/ImageLoader'

import styles from './styles'

Movie = ({ id, title, thumbnail, viewed, markViewed, rating, genre, progress, other }) ->
  <div className={styles.container}>
    <div className={styles.media}>
      <div>
        <ImageLoader src={thumbnail} className={styles.thumbnail}/>
      </div>
      <div className={styles.overlayContainer}>
        <button className={styles.playButton}>
          <Play />
        </button>
      </div>
    </div>
    <div>
      <div className={styles.body}>
        <div>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div>
          <span className={classNames(styles.genre, {"#{styles.hidden}": !genre.length})}>
            {if genre.length then genre.join(', ') else '.'}
          </span>
        </div>
        <div className={styles.data}>
          <div>
            <Rate disabled allowHalf value={rating} className={styles.rate}/>
          </div>
          <div>
            <Viewed viewed={viewed} onToggle={markViewed} id={id} />
          </div>
        </div>
      </div>
      <div className={styles.progress} style={{width: "#{progress}%"}}/>
    </div>
  </div>

export default Movie
