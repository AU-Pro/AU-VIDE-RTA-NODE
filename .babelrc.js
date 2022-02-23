module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: {
          version: 3,
          proposals: true
        }
      }
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    // ArcoDesign 组件按需加载
    [
      'babel-plugin-import',
      {
        libraryName: '@arco-design/web-react',
        libraryDirectory: 'es',
        camel2DashComponentName: false,
        style: true // 样式按需加载
      }
    ]
  ]
}
