import React from 'react'
import Card from 'antd/lib/Card'
import Button from 'antd/lib/Button'
import Rate from 'antd/lib/Rate'
import Checkbox from 'antd/lib/Checkbox'

import styles from './styles'

const Movie = ({ title, thumbnail, viewed }) =>
  <Card bodyStyle={{ padding: 0 }} title={title} className={styles.container}>
    <div>
      <img src={thumbnail} className={styles.thumbnail}/>
    </div>
    <div className={styles.actions}>
      <Button shape='circle' icon='step-forward' />
      <Checkbox defaultChecked={viewed} />
    </div>
  </Card>

export default Movie


/*


<Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
    <div className="custom-image">
      <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
    </div>
    <div className="custom-card">
      <h3>Europe Street beat</h3>
      <p>www.instagram.com</p>
    </div>
  </Card>

*/
