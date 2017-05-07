import React from 'react'
import Layout, { Header, Content, Footer, Sider } from 'antd/lib/Layout'
import Menu, { Item, SubMenu } from 'antd/lib/Menu'
import Icon from 'antd/lib/Icon'

import SidebarPlaceHolder from './SidebarPlaceHolder'

import MovieIcon from 'react-icons/lib/md/movie'
import TVShowIcon from 'react-icons/lib/md/live-tv'
import MusicIcon from 'react-icons/lib/md/music-note'
import SettingsIcon from 'react-icons/lib/md/settings'


const Sidebar = props =>
  <div styles={{backgroundColor: '#404040'}}>
    <Sider
      collapsible
      collapsed={props.collapsed}
      onCollapse={props.onCollapse}
      style={props.style}
      breakpoint='lg'
    >
      <div className="logo" />
      <Menu theme="dark" mode={props.mode} selectedKeys={[props.path]} onClick={props.onChangePath}>
        <Menu.Item key="/movies">
          <span>
            <MovieIcon />
            <span className="nav-text">Movies</span>
          </span>
        </Menu.Item>
        <Menu.Item key="/tvshows">
          <span>
            <TVShowIcon />
            <span className="nav-text">TV Shows</span>
          </span>
        </Menu.Item>
        <Menu.Item key="/music">
          <span>
            <MusicIcon />
            <span className="nav-text">Music</span>
          </span>
        </Menu.Item>
        <Menu.Item key="/settings">
          <span>
            <SettingsIcon />
            <span className="nav-text">Settings</span>
          </span>
        </Menu.Item>
      </Menu>
    </Sider>
    <SidebarPlaceHolder collapsed={props.collapsed} />
  </div>

export default Sidebar
