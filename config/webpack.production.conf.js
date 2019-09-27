//
const path = require('path');
const ExtractPlugin = require('extract-text-webpack-plugin') //npm install --save-dev extract-text-webpack-plugin@next
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const utils = require('./utils')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const proConfig = {
  entry: {
    // app: path.join(__dirname, 'src/index.js'), //分离js文件
    app:'./src/index.js',
    vendor: ['vue']
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  output: {
    // filename: "scripts/[name].[hash:5].bundles.js",
    filename: "scripts/[name].[chunkhash:8].js",      // id、name、hash、chunkhash都是webpack中的变量
    publicPath: "/public/"
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      extract: true,
      usePostCSS: true
    })
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..'),
      verbose: true
    }), //clean the dist file
    new ExtractPlugin('styles/[chunkhash:8].css'), //contentHsah会报错
    new BundleAnalyzerPlugin()
  ],
  // optimization: {
  //   //抽离出common包
  //   splitChunks: {
  //     cacheGroups: { // 这里开始设置缓存的 chunks
  //       commons: {
  //         chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
  //         name: 'common',
  //         minSize: 0, // 最小尺寸，默认0,
  //         minChunks: 2, // 最小 chunk ，默认1
  //         maxInitialRequests: 5 // 最大初始化请求书，默认1
  //       },
  //       vendor: {
  //         test: /node_modules/, // 正则规则验证，如果符合就提取 chunk
  //         chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
  //         name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
  //         priority: 10, // 缓存组优先级
  //         enforce: true
  //       }
  //     }
  //   },
  //   runtimeChunk: true
  // }
}


module.exports = proConfig
