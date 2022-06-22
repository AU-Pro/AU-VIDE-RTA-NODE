/* eslint-disable import/extensions */
import { ApiOutlined } from '@ant-design/icons'
import React from 'react'

// import stores from 'src/stores'
// const { UserStore } = stores

const Home = React.lazy(() => import('Pages/home'))
const NotFound = React.lazy(() => import('Pages/404'))

export const routesMap = [
  {
    path: '/',
    redirect: '/home',
    display: false
  },
  {
    path: '/home',
    element: Home,
    meta: {
      title: 'AUV-HOME',
      icon: ApiOutlined
    }
  },
  {
    path: '*',
    element: NotFound,
    display: false,
    auth: false,
    meta: {
      title: '404',
      icon: ApiOutlined
    }
  }
]
