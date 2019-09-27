import axios from 'axios'
import util from '@/utils'
import {
  Message
} from 'element-ui'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: "",
  timeout: 15000 // 请求超时时间
});

// 创建一个错误
function errorCreat(msg) {
  const err = new Error(msg)
  errorLog(err)
  throw err
}

// 记录和显示错误
function errorLog(err) {
  // 添加到日志
  //   store.dispatch('d2admin/log/add', {
  //     type: 'error',
  //     err,
  //     info: '数据请求异常'
  //   })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(err)
  }
  // 显示提示
  Message({
    message: err.message,
    type: 'error',
    duration: 5 * 1000
  })
}

// 响应拦截器
service.interceptors.response.use(
  response => {
    const dataAxios = response.data
    const {
      code
    } = dataAxios
    if (code === undefined) {
      return dataAxios
    } else {
      switch (code) {
        case 200:
          return dataAxios.data
        case 409:
          errorCreat(`${dataAxios.data}`)
        case 500:
          errorCreat(`${dataAxios.data}`)
        default:
          // 不是正确的 code
          errorCreat(`${dataAxios.code}: ${response.config.url}`)
          break
      }
    }
    return dataAxios
  },
  error => {
    if (error && error.response) {
      console.log('错误', error.response)
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break
        case 401:
          error.message = '未授权，请登录';
          break
        case 403:
          error.message = '拒绝访问';
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break
        case 408:
          error.message = '请求超时';
          break
        case 409:
          error.message = '资源冲突';
          break
        case 500:
          error.message = '服务器内部错误';
          break
        case 501:
          error.message = '服务未实现';
          break
        case 502:
          error.message = '网关错误';
          break
        case 503:
          error.message = '服务不可用';
          break
        case 504:
          error.message = '网关超时';
          break
        case 505:
          error.message = 'HTTP版本不受支持';
          break
        default:
          break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  })

export default service
