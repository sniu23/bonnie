import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// import axios from './utils/axios'
// Vue.prototype.$ajax = axios;

// if (__DEV__) {
//   require('./mock/index.js')
// }

Vue.use(ElementUI, { size: 'small' })

Vue.config.productionTip = false

const whiteList = ['/login', '/register', '/error/404', '/error/500']

router.beforeEach((to, from, next) => {
  NProgress.start()
  const valid = whiteList.some(function(item) {
    return item === to.path
  })
  if (valid) {
    next()
  } else {
    if (to.path === '/login') {
      // sessionStorage.removeItem('user')
      store.dispatch('LOGOUT')
    }
    // const user = JSON.parse(sessionStorage.getItem('user'))
    const user = store.state.user.user
    if (!user && to.path !== '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  }
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
