import React from 'react'
import PropTypes from 'prop-types'
import { Sider } from 'antd/lib/Layout'
import Menu, { Item } from 'antd/lib/Menu'
import classNames from 'classnames'

import MovieIcon from 'react-icons/lib/md/movie'
import TVShowIcon from 'react-icons/lib/md/live-tv'
import MusicIcon from 'react-icons/lib/md/music-note'
import SettingsIcon from 'react-icons/lib/md/settings'

import Left from 'react-icons/fa/angle-left'

import SidebarPlaceHolder from './SidebarPlaceHolder'

import styles from './styles'

paths = [
  {path: '/movies', label: 'Movies', Icon: MovieIcon}
  {path: '/tv-shows', label: 'TV Shows', Icon: TVShowIcon}
  {path: '/music', label: 'Music', Icon: MusicIcon}
  {path: '/settings', label: 'Settings', Icon: SettingsIcon}
]

renderItem = ({path, label, Icon}) ->
  <Item key={path}>
    <span>
      <Icon />
      <span>{label}</span>
    </span>
  </Item>

Sidebar = ({ mode, path, onChangePath, onCollapse, collapsed }) ->
  <div className={styles.sider}>
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      trigger={null}
      breakpoint='lg'
    >
      <div className='logo' />
      <div className={classNames styles.content, "#{styles.contentCollapsed}": collapsed}>
        <Menu theme='dark' mode={mode} selectedKeys={[path]} onClick={onChangePath}>
          {paths.map renderItem}
        </Menu>
        <div className={styles.triggerContainer}>
          <button onClick={-> onCollapse !collapsed}>
            <Left className={classNames styles.trigger, "#{styles.triggerCollapsed}": collapsed} />
          </button>
        </div>
      </div>
    </Sider>
    <SidebarPlaceHolder collapsed={collapsed} />
  </div>

export default Sidebar
