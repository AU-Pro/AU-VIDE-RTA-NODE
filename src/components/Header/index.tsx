import React from 'react'
import styles from './index.module.less'

interface Props {
  value: number
}

const Header = (props: Props) => {
  const { value } = props

  return <div className={styles.header}>value is: {value}</div>
}

export default Header
