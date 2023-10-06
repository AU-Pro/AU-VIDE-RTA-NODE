import React, { useContext, useCallback, useState } from 'react'
import { useDebounceFn } from 'ahooks'
import { InputNumber, Tooltip } from 'antd'
import { PaginationContext } from '../../context'
import styles from './index.less'

const PageInput = () => {
  const { hoverStatus, paginationState, setInputFocus } = useContext(PaginationContext)
  const { inputValue, maxPageNo, handlePageChange, pagination } = paginationState

  const [hasPressEnter, turnOnPressEnter] = useState(false)

  const { run: handleInput } = useDebounceFn(
    (value: number) => {
      if (hasPressEnter) {
        turnOnPressEnter(false)
        return
      }
      handlePageChange(value)
    },
    { wait: 1000 }
  )
  const handleInputFocus = useCallback(() => setInputFocus(true), [])

  const handleInputBlur = useCallback(() => {
    if (inputValue !== pagination.pageNo) {
      handlePageChange(inputValue)
    }
    setInputFocus(false)
  }, [inputValue, pagination])

  const handlePressEnter = useCallback((e: any) => {
    handlePageChange(Number(e?.target?.value) || 1)
    turnOnPressEnter(true)
  }, [])

  return (
    <div
      className={`
            ${styles.container}
            ${hoverStatus ? styles.hover : ''}
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
  )
}

export default PageInput
