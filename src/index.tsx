import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import App from './App'

const render = (Component: any) => {
  ReactDOM.render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>,
    document.querySelector('#app')
  )
}

render(App)

// webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept(['./App'], () => {
    // if you are using harmony modules ({modules:false})
    // render(App)
    // in all other cases - re-require App manually
    render(require('./App').default)
  })
}
