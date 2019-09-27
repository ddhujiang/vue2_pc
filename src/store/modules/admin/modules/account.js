import util from '@/utils'

export const GetTypes = {}

export const MutTypes = {}
export default {
  namespaced: true,
  state: {},
  actions: {
    login({
      dispatch
    }, {
      vm,
      username,
      password,
      route = {
        name: 'Home'
      }
    }) {
      return new Promise(async (resolve, reject) => {
        if (username === 'admin' && password === 'AL2019') {
          // 设置 vuex 用户信息
          await dispatch('admin/user/set', {
            name: username
          }, {
            root: true
          })
          util.cookies.set('token', 'tempToken')
          // 用户登录后从持久化数据加载一系列的设置
          var g = await dispatch('load')

          // 更新路由 尝试去获取 cookie 里保存的需要重定向的页面完整地址
          const path = util.cookies.get('redirect')
          // 根据是否存有重定向页面判断如何重定向
          vm.$router.replace(path ? {
            path
          } : route)
          // 删除 cookie 中保存的重定向页面
          util.cookies.remove('redirect')
          resolve()
        } else {
          reject()
        }
      })
    },
    /**
     * @description 退出用户并返回登录页面
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout ({ commit }, { vm, confirm = false }) {
        /**
         * @description 退出
         */
        function logout () {
          // 删除cookie
          util.cookies.remove('token')
          // 跳转路由
          vm.$router.push({
            name: 'login'
          })
        }
        console.log(confirm)
        // 判断是否需要确认
        if (confirm) {
          vm.$confirm('退出当前账户吗?  打开的标签页和用户设置将会被保存。', '确认操作', {
            confirmButtonText: '确定退出',
            cancelButtonText: '放弃',
            type: 'warning'
          })
            .then(() => {
              logout()
            })
            .catch(() => {
              vm.$message('放弃退出用户')
            })
        } else {
          logout()
        }
      },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} state vuex state
     */
    load({
      commit,
      dispatch
    }) {
      return new Promise(async resolve => {
        // DB -> store 加载用户名
        await dispatch('admin/user/load', null, {
          root: true
        })
        // end
        resolve()
      })
    }
  },
  mutations: {

  },
  getters: {

  }
}
