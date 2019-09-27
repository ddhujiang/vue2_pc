import QiniuApi from "@/api/qiniu";
import {
  Message
} from 'element-ui'

export const GetTypes = {
  GET_DATA: 'activity$getData'
}

export const MutTypes = {
  SET_DATA: 'activity$setData'
}
export default {
  namespaced: true,
  state: {
    upload_data: {}
  },
  actions: {
    getUploadData({
      commit,
      rootState
    }) {
      if (rootState.admin.config.upload_data) {
        QiniuApi.getToken("bdacity").then((res) => {
          commit(MutTypes.SET_DATA, {
            upload_data: { token: res }
          })
        });
      }
    },
  },
  mutations: {
    [MutTypes.SET_DATA](state, data) {
      Object.keys(state).forEach(key => {
        if (data[key]) {
          state[key] = data[key]
        }
      })
    }
  },
  getters: {
    getData(state) {
      return Object.assign({}, state)
    }
  }
}
