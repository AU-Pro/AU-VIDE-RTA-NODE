/**
 * @name Pagination 分页组件
 * @author AUPro
 * @date 2023-03-21
 * @lastEditBy AUPro
 * @lastEditTime 2023-09-26
 * @description 提供 hooks 和组件两种方式使用, usePaginationMethods 为 hooks 方式使用
 */
import React, { FC, useState, useCallback } from 'react'
import { useDebounceFn } from 'ahooks'
import { InputNumber, Tooltip } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import type { PaginationProps } from './type.d'
import usePaginationMethods from './hooks/usePaginationMethods'
import styles from './index.less'

const Pagination: FC<PaginationProps> = ({
  style = {},
  className = '',
  pagination,
  onChange,
  alias = {},
  disabled = false
}) => {
  const {
    pagination: { pageNo, pageSize, totalCount },
    inputValue,
    maxPageNo,
    handlePageGo,
    handlePageBack,
    handlePageChange
  } = usePaginationMethods({
    pagination,
    onChange,
    alias
  })

  const [inputFocus, setInputFocus] = useState(false)
  const [hoverStatus, setHoverStatus] = useState(false)

  const handleInputFocus = useCallback(() => setInputFocus(true), [])
  const handleInputBlur = useCallback(() => {
    if (inputValue !== pageNo) {
      handlePageChange(inputValue)
    }
    setInputFocus(false)
  }, [inputValue, pageNo])

  const { run: handleInput } = useDebounceFn(
    (value: number) => {
      handlePageChange(value)
    },
    { wait: 1000 }
  )

  const handlePressEnter = (e: any) => {
    handlePageChange(Number(e?.target?.value) || 1)
  }

  const handleMouseEnter = useCallback(() => {
    setHoverStatus(true)
  }, [])

  const handleMouseLeave = useCallback(() => !inputFocus && setHoverStatus(false), [inputFocus])

  return (
    <div
      className={`${styles.Pagination} ${className ?? ''} ${disabled ? styles['Pagination-disabled'] : ''}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`
                    ${styles.left}
                    ${pageNo <= 1 ? styles.disabled : ''}
                    ${hoverStatus ? styles['left-hover'] : ''}
                `}
        onClick={() => handlePageBack()}
      >
        <UpOutlined size={16} />
      </div>

      <div
        className={`
                    ${styles.center}
                    ${hoverStatus ? styles['center-hover'] : ''}
                `}
      >
        <Tooltip
          title='点击输入跳转页数'
          placement='top'
          trigger='hover'
          getTooltipContainer={() => document.body}
          overlayClassName={styles.tooltip}
        >
          <InputNumber
            className={styles.input}
            onChange={handleInput}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onPressEnter={(e) => handlePressEnter(e)}
            value={inputValue}
            max={maxPageNo ?? 1}
            min={1}
            controls={false}
          />
        </Tooltip>

        <div className={styles.divider}>/</div>

        <div className={styles.total}>{maxPageNo || 1}</div>
      </div>

      <div
        className={`
                    ${styles.right}
                    ${pageNo * pageSize >= totalCount ? styles.disabled : ''}
                `}
        onClick={() => handlePageGo()}
      >
        <DownOutlined size={16} />
      </div>
    </div>
  )
}

export default Pagination

export { default as usePaginationMethods } from './hooks/usePaginationMethods'
export * from './type.d'
