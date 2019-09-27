import Router from 'vue-router'
// 路由数据
import routes from '../routerConfig'
import util from '@/utils'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routerMap = [];
import store from '@/store/index'

export default () => {

  const router = new Router({

    routes,

    mode: 'history', // 默认的是hash'#'

    linkActiveClass: 'active-link',

    linkExactActiveClass: 'exact-active-link', // 完全匹配的时候才会加上exact-active-link这个class

    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    },
    // parseQuery (query) {}, // 将参数转换成obj对象

    // stringifyQuery (query) {}, // 将参数转换成字符串对象
    fallback: false
  })

  /**
   * 路由拦截
   * 权限验证
   */
  router.beforeEach((to, from, next) => {
    // 进度条
    NProgress.start()
    // 验证当前路由所有的匹配中是否需要有登录验证的
    if (to.matched.some(r => r.meta.requiresAuth)) {
      // 这里暂时将cookie里是否存有token作为验证是否登录的条件
      const token = util.cookies.get('token')
      if (token && token !== 'undefined') {
        next()
      } else {
        // 将当前预计打开的页面完整地址临时存储 登录后继续跳转
        // 这个 cookie(redirect) 会在登录后自动删除
        util.cookies.set('redirect', to.fullPath)
        // 没有登录的时候跳转到登录界面
        next({
          name: 'login'
        })
      }
    } else {
      // 不需要身份校验 直接通过
      next()
    }
  })

  router.afterEach(to => {
    NProgress.done()
  })

  return router
}
