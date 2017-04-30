import React from 'react'

import styles from './styles'

function getClassNames (sizes) {
  let className = ''
  Object.keys(sizes).forEach(key => {
    if(!sizes[key]) return
    console.log('Busco', `layout-${key}-${sizes[key]}`)
    className += styles[`layout-${key}-${sizes[key]}`] + ' '
  })
  return className
}

const Layout = ({children, xs, sm, md, lg, xl}) =>
  <div className={styles.container}>
    <div className={getClassNames({xs, sm, md, lg, xl})}>
      {children}
    </div>
  </div>

export default Layout
