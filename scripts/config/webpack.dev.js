const Webpack = require('webpack')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const paths = require('../paths')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  output: {
    filename: 'js/[name].js',
    path: paths.appBuild
  },
  devServer: {
    compress: true,
    stats: 'errors-only',
    clientLogLevel: 'silent',
    open: true,
    hot: true,
    noInfo: true,
    // 所有的 404 请求都会响应index.html的内容
    historyApiFallback: true,
    // 代理服务
    proxy: {
      ...require(paths.appProxySetup)
    }
  },
  plugins: [new Webpack.HotModuleReplacementPlugin(), new ErrorOverlayPlugin()],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0
    }
  }
})
