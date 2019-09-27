import request from '@/plugin/axios'
import util from "@/utils/index";

if (process.env.NODE_ENV === 'production') {
  var baseUrl = 'https://api.aolincode.com/api/activities'
} else {
  var baseUrl = 'https://api-test.aolincode.com/api/activities'
}

export default {
  baseUrl: baseUrl,
  getList(data) {
    return request.get(this.baseUrl, {
      params: data
    })
  },
  toggle(id) {
    return request.put(`${this.baseUrl}/${id}/toggle`, {
      params: {
        id: id
      }
    })
  },
  getTypeList() {
    return request.get(`${this.baseUrl}/activityTypes`)
  },
  getTeachers() {
    return request.get(`${this.baseUrl}/teachers`, {
      params: {
        limit: -1
      }
    })
  },
  getDetail(id) {
    return request.get(`${this.baseUrl}/${id}`, {
    })
  },
  changeActivities(data) {
    return request({
      url: `${this.baseUrl}/${data.id}`,
      method: 'put',
      data: util.dataToFormData(data),
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    })
  },
  addActivities(data) {
    return request({
      url: this.baseUrl,
      method: 'post',
      data: util.dataToFormData(data),
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    })
  }
}
