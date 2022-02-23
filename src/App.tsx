import React, { useCallback } from 'react'
import { ConfigProvider } from '@arco-design/web-react'
import { Router, Route, Routes } from 'react-router-dom'
import { Provider, observer } from 'mobx-react'
import zhCN from '@arco-design/web-react/es/locale/zh-CN'
import enUS from '@arco-design/web-react/es/locale/en-US'
import stores from './stores'
import './App.less'

const App = () => {
  const getArcoLocale = useCallback((lang) => {
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
    <Router location='/' navigator={undefined}>
      <ConfigProvider locale={getArcoLocale()}>
        <Provider {...stores}>
          <Routes>{}</Routes>
        </Provider>
      </ConfigProvider>
    </Router>
  )
}

export default observer(App)
