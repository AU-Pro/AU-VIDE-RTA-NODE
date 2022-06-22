import { observer, inject } from 'mobx-react'
import React, { ReactNode, useCallback, useState } from 'react'
import { Routes, Navigate, Route } from 'react-router-dom'
import { routesMap } from './routes'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RenderRouter = ({ userStore }: any) => {
  const [equalRoutes] = useState(routesMap)

  const renderRoute = useCallback((route): ReactNode => {
    if (route.redirect) {
      return <Route path={route.path} element={<Navigate to={route.redirect} replace />} />
    }

    // console.log(element)
    return <Route path={route.path} element={<route.element />} />
  }, [])

  return <Routes>{equalRoutes && equalRoutes.map((route) => renderRoute(route))}</Routes>
}

export default inject('UserStore')(observer(RenderRouter))
