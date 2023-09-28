import Mock from 'better-mock'
import base from './mock.base'

if (process.env.NODE_ENV === 'development') {
  Mock.setup({
    timeout: '300-600'
  })
  base()
}
