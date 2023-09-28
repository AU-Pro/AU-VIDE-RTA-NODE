const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin') // antd dayjs 替换 moment.js
const paths = require('../paths')
const { isDevelopment, isProduction } = require('../env')
const { imageInlineSizeLimit } = require('../conf')
// const CustomDevPlugin = require('../lib/devPlugin')

const cssModules = () => {
  const handler = isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader
  return [
    /** 处理第三方样式 */
    {
      test: /\.(css|less)$/,
      exclude: /src/,
      use: [
        handler,
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              // modifyVars: {},
              javascriptEnabled: true
            }
          }
        }
      ]
    },
    /** 只处理模块化的样式文件 */
    {
      test: /\.(module\.)?less$/,
      exclude: /node_modules/,
      use: [
        /** 创建style标签，添加到header  */
        handler,
        {
          loader: 'css-loader' /** 解析合并所有css代码 */,
          options: {
            modules: {
              mode: 'local',
              localIdentName: '[local]--[hash:base64:8]'
            }
          }
        },
        'postcss-loader' /** 添加浏览器厂商前缀 */,
        /** less 转化 css */
        'less-loader'
      ]
    }
  ]
}

module.exports = {
  entry: {
    app: paths.appIndex
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.less'],
    alias: {
      Src: paths.appSrc,
      Components: paths.appSrcComponents,
      Pages: paths.appSrcPages,
      Styled: paths.appSrcStyled,
      Utils: paths.appSrcUtils
    },
    fallback: {
      querystring: false
    }
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    axios: 'axios'
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/
      },
      ...cssModules(),
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: imageInlineSizeLimit
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    // new CustomDevPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      cache: true
    }),
    new CopyPlugin({
      patterns: [
        {
          context: paths.appPublic,
          from: '*',
          to: paths.appBuild,
          toType: 'dir',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    new WebpackBar({
      name: isDevelopment ? 'RUNNING' : 'BUNDLING',
      color: isDevelopment ? '#52c41a' : '#722ed1'
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: paths.appTsConfig
      }
    }),
    new AntdDayjsWebpackPlugin()
  ]
}
