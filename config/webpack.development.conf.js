//开发环境
const webpack = require('webpack');
const path = require('path');
const apiMocker = require('webpack-api-mocker');
const utils = require('./utils');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

//获取本地ip地址
const os = require('os');
let arr = [];
let HOST;
for (let key in os.networkInterfaces()) {
  os.networkInterfaces()[key].forEach((item) => {
    if (item.family === 'IPv4' && item.address.indexOf('192.168.') !== -1) {
      arr.push(item.address)
    }
  })
}
HOST = arr[0];


const config = {
  //入口
  entry: {   //对象的格式配置入口，满足多页应用
    // app: path.join(__dirname, 'src/index.js')
    app:'./src/index.js'
  },
  output: {
    filename: "scripts/[name].bundles.js",
    publicPath: "/",
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  optimization: {
    noEmitOnErrors: true
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      usePostCSS: true
    })
  },
  devServer: {
    before(app) {
      apiMocker(app, path.resolve('./mock/index.js'), {
        // proxy: {
        //     '/test': 'http://127.0.0.1:8000'
        // },
        // changeHost: true
      })
    },
    port: 8089,
    host:HOST , //0.0.0.0  http://localhost:8080/   '127.0.0.1'
    overlay: {
      error: true,
    },
    proxy: {
      '/v1': 'http://192.168.2.111:8081',
      changeOrigin: true
    },
    open: true,
    hot: true,
    historyApiFallback: {
      index: '/index.html'
    } // 因为是路由单页应用，请求地址不一定是默认的index.html
  },
  //对应上面hot,局部更新组建，不刷新网页
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
module.exports = config;
