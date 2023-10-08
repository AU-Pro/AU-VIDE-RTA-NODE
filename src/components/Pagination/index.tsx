/**
 * @name Pagination 分页组件
 * @author AUPro
 * @date 2023-03-21
 * @lastEditBy AUPro
 * @lastEditTime 2023-09-26
 * @description 提供 hooks 和组件两种方式使用, usePaginationMethods 为 hooks 方式使用
 */
import React, { FC, useState, useCallback, useMemo } from 'react'
import usePaginationMethods from './hooks/usePaginationMethods'
import { Capsule, PageAdd, PageInput, PageSub } from './components'
import type { PaginationType } from './type.d'
import { PaginationContext } from './context'
import styles from './index.less'

const Pagination: PaginationType = (props) => {
  const { className = '', pagination, onChange, alias = {}, disabled = false, children } = props

  const [inputFocus, setInputFocus] = useState(false)
  const [hoverStatus, setHoverStatus] = useState(false)

  const paginationHooksData = usePaginationMethods({
    pagination,
    onChange,
    alias
  })
  const {
    pagination: { pageNo, pageSize, totalCount }
  } = paginationHooksData

  return (
    <PaginationContext.Provider
      value={{
        disabled: disabled || !totalCount || pageNo <= 1,
        inputFocus,
        hoverStatus,
        setInputFocus,
        setHoverStatus,
        paginationState: {
          ...paginationHooksData
        }
      }}
    >
      <div className={`${styles.Pagination} ${className}`}>
        {children || (
          <Capsule>
            <PageSub />

            <PageInput />

            <PageAdd />
          </Capsule>
        )}
      </div>
    </PaginationContext.Provider>
  )
}

Pagination.Capsule = Capsule
Pagination.PageAdd = PageAdd
Pagination.PageSub = PageSub
Pagination.PageInput = PageInput

export default Pagination

export { default as usePaginationMethods } from './hooks/usePaginationMethods'
export * from './type.d'
