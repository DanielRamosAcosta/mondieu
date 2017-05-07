import React from 'react'
import Card from 'antd/lib/Card'
import Button from 'antd/lib/Button'
import Rate from 'antd/lib/Rate'
import Checkbox from 'antd/lib/Checkbox'
import classNames from 'classnames'

import ImageLoader from 'components/ImageLoader'

import styles from './styles'

const Movie = ({ id, title, thumbnail, viewed, markViewed, rating, genre, progress, ...other }) =>
  <div className={styles.container}>
    <div className={styles.media}>
      <div>
        <ImageLoader src={thumbnail} className={styles.thumbnail}/>
      </div>
      <div className={styles.overlayContainer}>
        <Button shape='circle' icon='step-forward' ghost/>
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
            <Rate disabled allowHalf value={rating} className={styles.rate}/>
          </div>
          <div>
            <Checkbox checked={viewed} onChange={event => markViewed(id, event.target.checked)} />
          </div>
        </div>
      </div>
      <div className={styles.progress} style={{width: `${progress}%`}}/>
    </div>
  </div>

export default Movie
