const proxySettings = {
  // 接口代理1
  '/api/': {
    // 代理 API地址
    target: 'http://198.168.111.111:3001',
    // 可以让 target参数是域名
    changeOrigin: true
    // 路径重写
    // pathRewrite: xxx,
    // 不检查安全问题 (可以使用无效证书的后端服务器)
    // secure: false,
  },
  // 接口代理2
  '/api-2/': {
    target: 'http://198.168.111.111:3002',
    changeOrigin: true,
    pathRewrite: {
      '^/api-2': ''
    }
  }
  // .....
}

module.exports = proxySettings
