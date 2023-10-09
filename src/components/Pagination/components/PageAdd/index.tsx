import React, { FC, useMemo, useContext, useEffect } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { PaginationContext } from '../../context'
import { PageAddProps } from '../../type.d'
import styles from './index.less'

const PageAdd: FC<PageAddProps> = () => {
  const { paginationState } = useContext(PaginationContext)
  const { pagination, handlePageGo } = paginationState || {}
  const { pageNo, pageSize, totalCount } = pagination || {}

  // console.log('update PageAdd')
  return useMemo(
    () => (
      <div
        className={`
              ${styles.add}
              ${pageNo * pageSize >= totalCount ? styles.disabled : ''}
          `}
        onClick={() => handlePageGo()}
      >
        <DownOutlined size={16} />
      </div>
    ),
    [paginationState]
  )
}

export default PageAdd
