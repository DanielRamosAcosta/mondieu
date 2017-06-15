import React from 'react'

import classNames from 'classnames'

import styles from './styles'

SidebarPlaceHolder = ({ collapsed }) ->
  <div className={classNames styles.placeholder, "#{styles.collapsed}": !collapsed}/>

export default SidebarPlaceHolder
