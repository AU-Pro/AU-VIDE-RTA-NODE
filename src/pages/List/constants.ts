export const columns = [
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

export interface ResponseType {
  result: any[]
  success: boolean
  totalCount: number
}
