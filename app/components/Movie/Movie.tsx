import * as React from 'react'
import Button from 'antd/lib/button'
import classNames from 'classnames'
import Play from 'react-icons/fa/play'

import Rate from 'components/Rate'
import Viewed from 'components/Viewed'
import ImageLoader from 'components/ImageLoader'

import { TSpropTypes, propTypes } from './types'
import styles from './styles.sass'

const Movie: React.StatelessComponent<TSpropTypes> = ({ id, title, thumbnail, viewed, markViewed, rating, genre, progress }) =>
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
          <span className={classNames(styles.genre, {[styles.hidden]: !genre.length})}>{genre.length ? genre.join(', ') : '.'}</span>
        </div>
        <div className={styles.data}>
          <div>
            <Rate value={rating} />
          </div>
          <div>
            <Viewed viewed={viewed} onToggle={markViewed} id={id} />
          </div>
        </div>
      </div>
      <div className={styles.progress} style={{width: `${progress}%`}}/>
    </div>
  </div>

Movie.propTypes = propTypes

export default Movie
