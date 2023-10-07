import React, { FC, useContext } from 'react'
import { UpOutlined } from '@ant-design/icons'
import { PaginationContext } from '../../context'
import { PageSubProps } from '../../type.d'

import styles from './index.less'

const PageSub: FC<PageSubProps> = () => {
  const { hoverStatus, paginationState } = useContext(PaginationContext)
  const { pagination, handlePageBack } = paginationState || {}

  return (
    <div
      className={`
              ${styles.sub}
              ${pagination?.pageNo <= 1 ? styles.disabled : ''}
              ${hoverStatus ? styles['sub-hover'] : ''}
          `}
      onClick={() => handlePageBack()}
    >
      <UpOutlined size={16} />
    </div>
  )
}

export default PageSub
