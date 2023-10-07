import React, { FC, useContext } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { PaginationContext } from '../../context'
import { PageAddProps } from '../../type.d'
import styles from './index.less'

const PageAdd: FC<PageAddProps> = () => {
  const { paginationState } = useContext(PaginationContext)
  const { pagination, handlePageGo } = paginationState || {}
  const { pageNo, pageSize, totalCount } = pagination || {}

  return (
    <div
      className={`
              ${styles.add}
              ${pageNo * pageSize >= totalCount ? styles.disabled : ''}
          `}
      onClick={() => handlePageGo()}
    >
      <DownOutlined size={16} />
    </div>
  )
}

export default PageAdd
