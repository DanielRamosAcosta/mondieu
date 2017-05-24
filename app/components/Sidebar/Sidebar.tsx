import * as React from 'react'
import PropTypes from 'prop-types'
import Layout from 'antd/lib/Layout'
import Menu from 'antd/lib/menu'
import classNames from 'classnames'

import MovieIcon from 'react-icons/md/movie'
import TVShowIcon from 'react-icons/md/live-tv'
import MusicIcon from 'react-icons/md/music-note'
import SettingsIcon from 'react-icons/md/settings'

import Left from 'react-icons/fa/angle-left'

import SidebarPlaceHolder from './SidebarPlaceHolder'
import MenuItem from './MenuItem'

import { TSpropTypes, propTypes, defaultProps } from './types'
import styles from './styles.sass'

const { Sider } = Layout

const paths = [
  {path: '/movies', label: 'Movies', Icon: MovieIcon},
  {path: '/tv-shows', label: 'TV Shows', Icon: TVShowIcon},
  {path: '/music', label: 'Music', Icon: MusicIcon},
  {path: '/settings', label: 'Settings', Icon: SettingsIcon}
]

const Sidebar: React.StatelessComponent<TSpropTypes> = ({ collapsed, onCollapse, mode, path, onChangePath }) =>
  <div className={styles.sider}>
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      trigger={null}
      breakpoint='lg'
    >
      <div className="logo" />
      <div className={classNames(styles.content, {[styles.contentCollapsed]: collapsed})}>
        <Menu theme='dark' mode={mode} selectedKeys={[path]} onClick={({ key: path }: {key: string}) => onChangePath(path)}>
          {paths.map(MenuItem)}
        </Menu>
        <div className={styles.triggerContainer}>
          <button onClick={() => onCollapse(!collapsed)}>
            <div className={classNames(styles.trigger, {[styles.triggerCollapsed]: collapsed})}>
              <Left />
            </div>
          </button>
        </div>
      </div>
    </Sider>
    <SidebarPlaceHolder collapsed={collapsed} />
  </div>

export default Sidebar
