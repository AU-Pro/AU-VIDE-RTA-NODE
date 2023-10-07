import React, { useCallback, useEffect } from 'react'
import { usePagination } from 'ahooks'
import { Table } from 'antd'
import Pagination from 'Src/components/Pagination'
import { ColumnWidthOutlined } from '@ant-design/icons'
import { columns, ResponseType } from './constants'
import styles from './index.less'

export const pageAliasConfig = {
  pageNo: 'current',
  totalCount: 'total'
}

const { Capsule, PageSub, PageInput, PageAdd } = Pagination

const List = () => {
  const { data, pagination, run, refresh, loading } = usePagination(async ({ current, pageSize }) => {
    const { result, success, totalCount }: ResponseType = await fetch('base/list', {
      method: 'post',
      body: JSON.stringify({
        pageNo: current,
        pageSize
      })
    }).then((res) => res.json())

    return success
      ? { list: result, total: totalCount, current, pageSize }
      : {
          list: [],
          total: 0,
          current,
          pageSize
        }
  }, {})

  const handlePageChange = useCallback(
    ({ currentPage }) => {
      pagination.onChange(currentPage, pagination.pageSize)
    },
    [pagination]
  )

  return (
    <div className={styles.List}>
      <div className={styles.Table}>
        <Table
          pagination={false}
          rowKey='id'
          dataSource={data?.list}
          columns={columns}
          loading={loading}
          scroll={{
            scrollToFirstRowOnChange: true,
            x: '100%',
            y: 'calc(100% - 20px)'
          }}
        />
      </div>
      <Pagination pagination={pagination} alias={pageAliasConfig} onChange={handlePageChange}>
        <Capsule>
          <PageSub />

          <ColumnWidthOutlined style={{ margin: '0px 12px', color: '#bfbfbf' }} />

          <PageInput />

          <PageAdd />
        </Capsule>
      </Pagination>
    </div>
  )
}

export default List
