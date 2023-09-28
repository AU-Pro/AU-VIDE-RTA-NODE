import React, { useCallback } from 'react'
import { ConfigProvider } from 'antd'
import { Provider, observer } from 'mobx-react'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import { Locale } from 'antd/lib/locale-provider'
import RenderRouter from './router/RenderRouter'
import stores from './stores'
import './App.less'
import './mock'

const App = () => {
  const { CommonStore } = stores

  const getLocale = useCallback((lang: string): Locale => {
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
    <ConfigProvider locale={getLocale(CommonStore.language)}>
      <Provider {...stores}>
        <React.Suspense fallback={<div />}>
          <RenderRouter />
        </React.Suspense>
      </Provider>
    </ConfigProvider>
  )
}

export default observer(App)
