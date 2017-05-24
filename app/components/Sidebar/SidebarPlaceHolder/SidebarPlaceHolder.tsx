import * as React from 'react'

import classNames from 'classnames'

import { TSpropTypes, propTypes, defaultProps } from './types'
import styles from './styles.sass'

const SidebarPlaceHolder: React.StatelessComponent<TSpropTypes> = ({ collapsed }) =>
  <div className={classNames(styles.placeholder, { [styles.collapsed]: !collapsed })}/>

SidebarPlaceHolder.propTypes = propTypes
SidebarPlaceHolder.defaultProps = defaultProps

export default SidebarPlaceHolder
