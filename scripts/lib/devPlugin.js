/* eslint-disable no-param-reassign */
class CustomDevPlugin {
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options) {
    this.options = options
  }

  apply = (compiler) => {
    // 在emit阶段插入钩子函数，用于特定时机处理额外的逻辑；
    // compiler.hooks.emit.tap('CustomDevPlugin', (compilation) => {})
    // 如果事件是异步的，会带两个参数，第二个参数为回调函数，在插件处理完任务时需要调用回调函数通知webpack，才会进入下一个处理流程。
    compiler.plugin('emit', (compilation, callback) => {
      // 支持处理逻辑
      // 处理完毕后执行 callback 以通知 Webpack
      // 如果不执行 callback，运行流程将会一直卡在这不往下执行
      console.log('<--------- AU-Demo-RUN --------->')
      // 修改或添加资源
      compilation.assets['new-file.js'] = {
        source() {
          return 'var a=1'
        },
        size() {
          return this.source().length
        }
      }
      callback()
    })
  }
}

module.exports = CustomDevPlugin

// 安装插件时, 只需要将它的一个实例放到Webpack config plugins 数组里面
// const CustomDevPlugin = require('../lib/CustomDevPlugin')
// var webpackConfig = {
//   plugins: [new CustomDevPlugin({ options: true })],
// }
