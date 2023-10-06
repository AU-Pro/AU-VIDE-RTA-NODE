import React, { useContext, useCallback, FC } from 'react'
import { PaginationContext } from '../../context'
import styles from './index.less'

export interface CapsuleProps {
  children: React.ReactNode
}

const Capsule: FC<CapsuleProps> = (props) => {
  const { children } = props
  const { disabled, inputFocus, setHoverStatus } = useContext(PaginationContext)

  const handleMouseEnter = useCallback(() => {
    setHoverStatus(true)
  }, [])

  const handleMouseLeave = useCallback(() => !inputFocus && setHoverStatus(false), [inputFocus])

  return (
    <div
      className={`${styles.container} ${disabled ? styles.disabled : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

export default Capsule
