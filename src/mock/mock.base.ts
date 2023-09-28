import Mock from 'better-mock'

export default function start() {
  Mock.mock('base/list', 'post', {
    success: true,
    'result|10': [
      {
        name: '@cname',
        mobile: /^1[358][1-9]\d{8}/,
        'age|18-60': 1,
        gender: '@pick(["男", "女"])',
        info: '@cparagraph(1, 3)',
        id: '@id',
        height: '@integer(150, 200)',
        weight: '@integer(50, 100)'
      }
    ],
    'pageNo|+1': 1,
    pageSize: 10,
    totalCount: 102
  })
}
