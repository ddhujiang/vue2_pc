const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const vueLoaderOptions = require('./config/vue-loader');
const merge = require('webpack-merge');
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development';
const modeConfig = require(`./config/webpack.${process.env.NODE_ENV}.conf`);
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');


const config = {
  target: 'web',
  // mode: process.env.NODE_ENV,
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderOptions(isDev)
      },
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:8].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/font/[name].[hash:8]-aaa.[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),     //使用Vue-loader 15.*之后的版本，都是需要VueLoaderPlugin的,
    new HtmlWebpackPlugin({
      title:'vue_vvschool'
    }),   //动态生产html文件
    new webpack.DllReferencePlugin({
      // 告诉webpack使用了哪些第三方库代码
      manifest: require(path.join(__dirname, './static', 'vendor-manifest.json'))
    }),
    //这个主要是将生成的vendor.dll.js文件插入到页面index.html中。
    new AddAssetHtmlPlugin([{
      filepath: path.join(__dirname,'./static/js/vendor.dll.js'),
    }]),
  ]
};
//冲突时，config配置会覆盖modeConfig
module.exports = merge(modeConfig, config);
