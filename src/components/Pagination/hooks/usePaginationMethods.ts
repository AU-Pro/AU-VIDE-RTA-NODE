/**
 * @name usePaginationMethods
 * @author AUPro
 * @date 2023-09-26
 * @lastEditBy AUPro
 * @lastEditTime 2023-09-26
 * @description: 分页器逻辑处理 hooks; 返回分页器逻辑处理方法，提供步进、跳转、输入框输入页码等方法
 */

import { useCallback, useEffect, useReducer } from 'react'
import { DEFAULT_PAGE_SIZE } from '../constants'
import type { PaginationAction, UsePaginationMethodsProps, UsePaginationMethodsTypes } from '../type.d'

const usePaginationMethods = ({
  pagination,
  alias = {},
  onChange
}: UsePaginationMethodsProps): UsePaginationMethodsTypes => {
  const aliasKey = {
    pageNo: 'pageNo',
    pageSize: 'pageSize',
    totalCount: 'totalCount',
    ...alias
  }
  const paginationReducer: PaginationAction = (preState, nextState) => ({
    ...preState,
    ...nextState
  })
  const [state, setState] = useReducer(paginationReducer, {
    pagination: {
      pageNo: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      totalCount: 0
    },
    inputValue: 1,
    maxPageNo: 1
  })

  useEffect(() => {
    const pageSize = pagination?.[aliasKey.pageSize] || DEFAULT_PAGE_SIZE
    const totalCount = pagination?.[aliasKey.totalCount] ?? 0
    const maxPageNo = Math.ceil(totalCount / pageSize ?? 1) || 1
    // 对当前页码与 最大页数 进行校验
    let pageNo = pagination?.[aliasKey.pageNo] || 1
    if (pageNo > maxPageNo) {
      pageNo = maxPageNo
    }

    setState({
      pagination: {
        pageNo,
        pageSize,
        totalCount
      },
      maxPageNo,
      inputValue: pageNo
    })
  }, [pagination])

  /**
   * 页码改变
   * @param type 类型: go: 跳转到某一页, back: 向前或向后翻页, change: 输入框输入页码
   * @param value 值: type为go或back时, value为-1或1, type为change时, value为输入框的值
   */
  const handlePage = useCallback(
    (type: string, value = 1) => {
      let currentPage = 1
      const { pageNo = 1 } = state?.pagination || { pageNo: 1 }
      switch (type) {
        case 'go':
          if (value === -1) {
            currentPage = state.maxPageNo
          } else if (Math.floor(value) + pageNo > state.maxPageNo) {
            currentPage = state.maxPageNo
          } else {
            currentPage = Math.floor(value) + pageNo
          }
          break

        case 'back':
          if (value === -1) {
            currentPage = 1
          } else if (pageNo - Math.floor(value) < 1) {
            currentPage = 1
          } else {
            currentPage = pageNo - Math.floor(value)
          }
          break

        case 'change':
          if (value < 1) {
            currentPage = 1
          } else if (value > state.maxPageNo) {
            currentPage = state.maxPageNo
          } else {
            currentPage = value
          }
          break

        default:
          break
      }

      setState({ inputValue: currentPage })
      onChange?.({ currentPage })
    },
    [state.maxPageNo, state.pagination.pageNo, onChange]
  )

  return {
    pagination: {
      pageNo: state.pagination.pageNo || 1,
      pageSize: state.pagination.pageSize || DEFAULT_PAGE_SIZE,
      totalCount: state.pagination.totalCount || 0
    },
    inputValue: state.inputValue,
    maxPageNo: state.maxPageNo,
    handlePageGo: (val) => handlePage('go', val),
    handlePageBack: (val) => handlePage('back', val),
    handlePageChange: (val) => handlePage('change', val)
  }
}

export default usePaginationMethods
