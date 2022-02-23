import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import Header from 'Components/Header'

import store from './store'

const Home = () => {
  useEffect(() => {
    store.setState({ value: 1 })
  }, [])

  return <Header value={store.value} />
}

export default observer(Home)
