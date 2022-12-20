// 权限拦截 导航守卫 路由守卫 router
import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store实例
import getPageTitle from '@/utils/get-page-title'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/404'] // 定义白名单 所有不受权限控制的页面

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 首先判断有没有token
  if (store.getters.token) {
    // 如果有token 继续判断是不是去登陆页
    if (to.path === '/login') {
      // 表示去的是登录页
      next('/') // 跳到主页
      NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时 进度条的不关闭的问题
    } else {
      next() // 直接放行
      if (!store.getters.userId) {
        // 如果没有id这个值 才会调用 vuex的获取资料的action
        await store.dispatch('user/getUserInfo')
        // 为什么要写await 因为我们想获取完资料再去放行
      }
    }
  } else {
    // 如果没有token
    if (whiteList.indexOf(to.path) > -1) {
      // 如果找到了  表示在名单里面
      next() // 放行
    } else {
      next('/login') // 跳到登录页
      NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时 进度条的不关闭的问题
    }
  }
  next()
})

// 后置路由守卫
router.afterEach((to, from) => {
  document.title = getPageTitle(to.meta.title)
  NProgress.done() // 关闭进度条
})
