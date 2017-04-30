import React from 'react'
import Card from 'antd/lib/Card'
import Button from 'antd/lib/Button'
import Rate from 'antd/lib/Rate'
import Checkbox from 'antd/lib/Checkbox'

import styles from './styles'

const Movie = ({ id, title, thumbnail, viewed, markViewed }) =>
  <Card bodyStyle={{ padding: 0 }} title={title} className={styles.container}>
    <div>
      <img src={thumbnail} className={styles.thumbnail}/>
    </div>
    <div className={styles.actions}>
      <Button shape='circle' icon='step-forward' />
      <Checkbox checked={viewed} onChange={event => markViewed(id, event.target.checked)} />
    </div>
  </Card>

export default Movie
