import Vue from 'vue'
import Router from 'vue-router'

// 在引入 vue-router 后，我们需要使用 Vue.use 来使用插件
Vue.use(Router)

// import Register from '@/views/auth/Register' // 下方使用懒加载，所以无需引入
const routes = [
  {
    path: '/auth/register',             // 路由路径  对应 router-link  中的 to=“xxx”
    name: 'Register',                   // 路由名称
    component: () => import('@/views/auth/Register')    // 对应的视图组件，此方法实现路由懒加载，即当路由被访问时才加载对应的组件
    // component: Register              // 如果不需要懒加载， 就可以在上方先引入组件在配置 
  }
]

// 创建新的路由实例
const router = new Router({
  mode: 'history',      // 路由模式，默认值 'hash' 使用井号（ # ）作路由，值 'history' 可利用 History API 来完成页面跳转且无须重新加载；
  routes
})

export default router