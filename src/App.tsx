import React, { useCallback } from 'react'
import { ConfigProvider } from 'antd'
import { Router, Route, Routes } from 'react-router-dom'
import { Provider, observer } from 'mobx-react'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import stores from './stores'
import './App.less'
import history from '../lib/history'

const App = () => {
  const { CommonStore } = stores

  const getLocale = useCallback((lang) => {
    switch (lang) {
      case 'zh-CN':
        return zhCN
      case 'en-US':
        return enUS
      default:
        return zhCN
    }
  }, [])

  return (
    <Router location='/' navigator={history}>
      <ConfigProvider locale={getLocale(CommonStore.language)}>
        <Provider {...stores}>
          <Routes>{}</Routes>
        </Provider>
      </ConfigProvider>
    </Router>
  )
}

export default observer(App)
