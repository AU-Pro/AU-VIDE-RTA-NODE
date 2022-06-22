import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import Header from 'Components/Header'

import store from './store'

interface IProps {
  time: string
  name: string
}

const Home: React.FC<IProps> = ({ name = 'default', time = 'default' }: IProps) => {
  const [userName, setUserName] = useState<string>(name)
  const [userTime, setUserTime] = useState<string>(time)
  const [info, setInfo] = useState<string>(`${userName}_-_${userTime}`)

  useEffect(() => {
    setUserName(name)
    setUserTime(time)
    setInfo(`${name}_-_${time}`)
  }, [name, time])

  useEffect(() => {
    store.setState({ value: 1 })
  }, [])

  return (
    <>
      <Header value={store.value} />

      <p>name: {userName}</p>
      <p>time: {userTime}</p>
      <p>info: {info}</p>
    </>
  )
}

export default observer(Home)
