import React, { useState } from 'react'
import { observer } from 'mobx-react'

const NotFound = () => {
  const [text] = useState('页面不存在')

  return <div>{text}</div>
}

export default observer(NotFound)
