import * as React from 'react'

import Menu from 'antd/lib/menu'

import { TSpropTypes, propTypes } from './types'

const { Item } = Menu

const MenuItem: React.StatelessComponent<TSpropTypes> = ({ path, label, Icon }) =>
  <Item key={path}>
    <span>
      <Icon />
      <span>{label}</span>
    </span>
  </Item>

MenuItem.propTypes = propTypes

export default MenuItem
