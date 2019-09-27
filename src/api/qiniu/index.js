import request from '@/plugin/axios'

export default {
  getToken(scope) {
    return request.get(`http://admin.boolan.com/api/qiniu/uploadtoken?scope=${scope}`)
  }
}
