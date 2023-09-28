import React, { useCallback, useEffect } from 'react'
import { usePagination } from 'ahooks'
import { Table } from 'antd'
import Pagination from 'Src/components/Pagination'
import styles from './index.less'

export const pageAliasConfig = {
  pageNo: 'current',
  totalCount: 'total'
}

interface Response {
  result: any[]
  success: boolean
  total: number
}

const List = () => {
  const { data, pagination, run, refresh, loading } = usePagination(async ({ current, pageSize }) => {
    const { result, success, total }: Response = await fetch('base/list', {
      method: 'post',
      body: JSON.stringify({
        pageNo: current,
        pageSize
      })
    }).then((res) => res.json())

    return success
      ? { list: result, total, current, pageSize }
      : {
          list: [],
          total: 0,
          current,
          pageSize
        }
  }, {})

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 160
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width: 200
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 160
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width: 100
    },
    {
      title: '身高(cm)',
      dataIndex: 'height',
      width: 100
    },
    {
      title: '体重(kg)',
      dataIndex: 'weight',
      width: 100
    }
  ]

  const handlePageChange = useCallback(
    (currentPage) => {
      pagination.onChange(currentPage, pagination.pageSize)
    },
    [pagination]
  )

  return (
    <div className={styles.List}>
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
      <Pagination pagination={pagination} alias={pageAliasConfig} onChange={handlePageChange} />
    </div>
  )
}

export default List
